import React from 'react'
import Board from '../models/Board'
import PlacementValidator from '../models/PlacementValidator'
import BoardContainer from './BoardContainer'
import ShipPlacementInstruction from '../components/ShipPlacementInstruction'
import io from 'socket.io-client'

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      instructionDisplay: 'block',
      shipsToBePlaced: [5, 4, 3, 3, 2],
      shipSquaresAllocated: 0,
      shipCurrentlyBeingPlaced: [],
      shipPlacementInstruction: null,
      primaryBoard: new Board(props.boardSize),
      trackingBoard: new Board(props.boardSize, 'tracking'),
      shotTaken: {
        row: null,
        square: null
      }
    }

    this.socket = io("http://localhost:3000")
    this.socket.on('shotTaken', this.processShot.bind(this))
    this.socket.on('shotResponse', this.receiveShotResponse.bind(this))
  }

  componentDidMount(){
    const sizeOfFirstShip = this.state.shipsToBePlaced[0]
    this.setState({shipPlacementInstruction: "click to place a ship of size: " + sizeOfFirstShip})
  }

  receiveShotResponse(squareValue){
    let currentShot = this.state.shotTaken
    //if statement to check this player made the shot, not the opposite player
    if (currentShot.row !== null){

      this.setState((prevState) => {
        prevState.trackingBoard.rows[prevState.shotTaken.row][prevState.shotTaken.square] = squareValue
        prevState.shotTaken = {
          row: null,
          square: null
        }
        return prevState
      })
    }
   
  }

  processShot(coords){
    //if statement to check that the other player made the shot, and we need to respond
    if (this.state.shotTaken.row === null){
      let row = coords.row
      let square = coords.square

      let squareValue = this.state.primaryBoard.rows[row][square]

      this.socket.emit('shotResponse', squareValue)
    }
  }

  //NEED TO RENAME THIS FUNCTION!
  //placing own ships function
  markSquareFull(rowNum, squareNum){
    //only do this if there are ships remaining to be placed
    if (this.state.shipsToBePlaced.length === 0) return
    
    this.setState((prevState) => {
      //check if square is to be marked full or changed to empty
      if (prevState.primaryBoard.rows[rowNum][squareNum] === ''){
        prevState.shipCurrentlyBeingPlaced.push([rowNum, squareNum])
        prevState.primaryBoard.markSquareFull(rowNum, squareNum)
      } else {
        //remove it from the ship currently being placed, and empty square again
        let indexOfPrevMarker = this.findIndexOfMarker(prevState, rowNum, squareNum)

        // prevState.shipCurrentlyBeingPlaced
        prevState.shipCurrentlyBeingPlaced.splice(indexOfPrevMarker, 1)
        prevState.primaryBoard.rows[rowNum][squareNum] = ''
      }
      return prevState
      
    })
  }

  //helper method used during placement of ships, if user wants to change marked square back to empty
  findIndexOfMarker(prevState, rowNum, squareNum){
    for (var i= 0; i < prevState.shipCurrentlyBeingPlaced.length; i++){
      if (prevState.shipCurrentlyBeingPlaced[i][0] === rowNum && prevState.shipCurrentlyBeingPlaced[i][1] === squareNum){
        return i
      }
    }
  }

  placeShipHandler(){
    //needs to use validator, and also check each time that the correct number of squares are occupied. If not, there is an overlap in ships - not allowed

    let sizeOfShip = this.state.shipsToBePlaced[0]
    let submittedShip = this.state.shipCurrentlyBeingPlaced

    const validator = new PlacementValidator()
    const valid = validator.validate(sizeOfShip, submittedShip)

    let currentlyOccupiedSquares = this.state.primaryBoard.getNumOfOccupiedSquares()
    let newTotalShipSquaresAllocated = this.state.shipSquaresAllocated + sizeOfShip

    //if placement valid
    //AND if number of squares currently occupied is consistent with boats placed (no overlaps)
    if(valid && currentlyOccupiedSquares === newTotalShipSquaresAllocated){
      this.setState((prevState) => {
        //chop off the error text if present
        if (this.state.shipPlacementInstruction.substring(0, 5) === "Error"){
          prevState.shipPlacementInstruction = prevState.shipPlacementInstruction.substring(118, prevState.shipPlacementInstruction.length)
        }

        //remove the first item from the ships to be placed array, and add it to the squares occupied count
        prevState.shipSquaresAllocated += prevState.shipsToBePlaced.shift()
        //clears the placement coordinates
        prevState.shipCurrentlyBeingPlaced = []
        //refreshes the instructions

        //check if we need render new instructions
        if (prevState.shipsToBePlaced.length === 0){
          //if no further ships to place, remove the instruction panel
          prevState.instructionDisplay = 'none'
        } else {
          let prevInstruction = prevState.shipPlacementInstruction
          let newInstruction = prevInstruction.substring(0, prevInstruction.length - 1) + prevState.shipsToBePlaced[0]
          prevState.shipPlacementInstruction = newInstruction
        }
        return prevState
      })
    } else {
      //do this if the placement isn't valid

      //check if there is already error text
      if (this.state.shipPlacementInstruction.substring(0, 5) !== "Error"){
        this.setState((prevState) => {
          const errorText = 'Error: please ensure ship is of correct size, placed horizontally or vertically, and does not cross an existing ship. '
          let prevInstruction = prevState.shipPlacementInstruction
          let newInstruction = errorText + prevInstruction
          prevState.shipPlacementInstruction = newInstruction
          return prevState
        })
      }
      
    }
   
    
  }

 

  handleTrackingSquareClick(rowNum, squareNum){
    let coords = {
      row: rowNum,
      square: squareNum
    }
    this.setState({shotTaken: coords}, function(){
      this.socket.emit('shotTaken', coords)
    })

    
  }

  render(){

    return (
      <div className="game-container">
        <div className="ship-placement-area">
          <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.primaryBoard} squareClickHandler={this.markSquareFull.bind(this)} title={"Your ships"}/>
          <ShipPlacementInstruction instruction={this.state.shipPlacementInstruction} buttonClickHandler={this.placeShipHandler.bind(this)} displayOption={this.state.instructionDisplay}/>
        </div>
        <div className ="tracking-area">
          <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.trackingBoard} squareClickHandler={this.handleTrackingSquareClick.bind(this)} title={"Tracking board"}/>
        </div>
      </div>

    )
  }
}

export default GameContainer