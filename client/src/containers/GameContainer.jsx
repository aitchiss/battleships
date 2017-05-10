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

      console.log('process shot response current state', this.state.primaryBoard)
      this.socket.emit('shotResponse', squareValue)
    }
  }

  //placing own ships function
  markSquareFull(rowNum, squareNum){
    this.setState((prevState) => {
      prevState.shipCurrentlyBeingPlaced.push([rowNum, squareNum])
      prevState.primaryBoard.markSquareFull(rowNum, squareNum)
      return prevState
    })
  }

  placeShipHandler(){
    //needs to use validator, and also check each time that the correct number of squares are occupied. If not, there is an overlap in ships - not allowed

    let sizeOfShip = this.state.shipsToBePlaced[0]
    let submittedShip = this.state.shipCurrentlyBeingPlaced

    const validator = new PlacementValidator()
    const valid = validator.validate(sizeOfShip, submittedShip)
    console.log('valid?', valid)

    let currentlyOccupiedSquares = this.state.primaryBoard.getNumOfOccupiedSquares()
    let newTotalShipSquaresAllocated = this.state.shipSquaresAllocated + sizeOfShip

    //if placement valid
    //AND if number of squares currently occupied is consistent with boats placed (no overlaps)
    if(valid && currentlyOccupiedSquares === newTotalShipSquaresAllocated){
      this.setState((prevState) => {
        prevState.shipsToBePlaced.shift()
        var prevInstruction = prevState.shipPlacementInstruction
        var newInstruction = prevInstruction.substring(0, prevInstruction.length - 1) + prevState.shipsToBePlaced[0]
        prevState.shipPlacementInstruction = newInstruction
        
        return prevState
      })
    }

    
    //remove the first item from the ships to be placed array, and add it to the squares occupied count

    //later will need some code to deal with the event when there are no further items in the ships to be placed array
    
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
          <ShipPlacementInstruction instruction={this.state.shipPlacementInstruction} buttonClickHandler={this.placeShipHandler.bind(this)}/>
        </div>
        <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.trackingBoard} squareClickHandler={this.handleTrackingSquareClick.bind(this)} title={"Tracking board"}/>
      </div>

    )
  }
}

export default GameContainer