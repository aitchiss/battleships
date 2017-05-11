import React from 'react'
import Board from '../models/Board'
import PlacementValidator from '../models/PlacementValidator'
import BoardContainer from './BoardContainer'
import ShipPlacementInstruction from '../components/ShipPlacementInstruction'
import GamePlayInfo from '../components/GamePlayInfo'
import io from 'socket.io-client'

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      socketID: null,
      readyToPlay: false,
      currentTurn: null,
      opponentReadyToPlay: false,
      instructionDisplay: 'block',
      shipsToBePlaced: [5, 4, 3, 3, 2],
      shipSquaresAllocated: 0,
      shipCurrentlyBeingPlaced: [],
      shipPlacementInstruction: null,
      errorText: '',
      primaryBoard: new Board(props.boardSize),
      trackingBoard: new Board(props.boardSize, 'tracking'),
      primaryPlayerInfo: '',
      opponentPlayerInfo: 'waiting for player',
      shotTaken: {
        row: null,
        square: null
      },
      hitsTaken: 0,
      hitsScored: 0
    }

    //socket listens for shots taken, and responses that detail player square's contents. Also checks when players are ready to play and if the game has been won.
    this.socket = io("http://localhost:3000")

    //on connection, stores own socket id, so it can distinguish between the two players
    this.socket.on('connect', () => {
      this.setState({socketID: this.socket.id})
    })

    //listeners and handlers for socket events
    this.socket.on('shotTaken', this.processShot.bind(this))
    this.socket.on('shotResponse', this.receiveShotResponse.bind(this))
    this.socket.on('readyToPlay', this.markOpponentReady.bind(this))
    this.socket.on('win', this.gameOver.bind(this))
  }

  //on load, render the ship placement instructions
  componentDidMount(){
    const sizeOfFirstShip = this.state.shipsToBePlaced[0]
    this.setState({shipPlacementInstruction: "Click to place a ship of size: " + sizeOfFirstShip})
  }

  //handles a click on the primary board, i.e. for placement of own ships
  handlePrimaryBoardClick(rowNum, squareNum){
    //only do this if there are ships remaining to be placed
    if (this.state.shipsToBePlaced.length === 0) return
    
    this.setState((prevState) => {
      //check if square is to be marked full (and added to current ship array) or changed back to empty
      if (prevState.primaryBoard.rows[rowNum][squareNum] === ''){
        prevState.shipCurrentlyBeingPlaced.push([rowNum, squareNum])
        prevState.primaryBoard.markSquareFull(rowNum, squareNum)
      } else {
        //check where we need to remove the marker from the ship currently being placed
        let indexOfPrevMarker = this.findIndexOfMarker(prevState, rowNum, squareNum)
        //only allow changes if the ship is the one being currently placed (not already confirmed)
        if (indexOfPrevMarker !== -1){
          //remove it from the ship currently being placed, and empty square again
          prevState.shipCurrentlyBeingPlaced.splice(indexOfPrevMarker, 1)
          prevState.primaryBoard.rows[rowNum][squareNum] = ''
        }
      }
      return prevState
    })
  }

  //helper method used by handlePrimaryBoardClick
  findIndexOfMarker(prevState, rowNum, squareNum){
    let index = -1
    for (var i= 0; i < prevState.shipCurrentlyBeingPlaced.length; i++){
      if (prevState.shipCurrentlyBeingPlaced[i][0] === rowNum && prevState.shipCurrentlyBeingPlaced[i][1] === squareNum){
        index = i
      } 
    }
    return index
  }

  //handles the confirm ship placement button click
  placeShipHandler(){
    const validator = new PlacementValidator()

    let sizeOfShip = this.state.shipsToBePlaced[0]
    let submittedShip = this.state.shipCurrentlyBeingPlaced
    //returns a boolean to let us know if placement is consecutive squares in row or column
    const valid = validator.validate(sizeOfShip, submittedShip)

    //checks that there are no overlaps with previous ships - i.e. the correct total number of squares are occupied
    let currentlyOccupiedSquares = this.state.primaryBoard.getNumOfOccupiedSquares()
    let newTotalShipSquaresAllocated = this.state.shipSquaresAllocated + sizeOfShip

    if(valid && currentlyOccupiedSquares === newTotalShipSquaresAllocated){
      this.processValidPlacement()
    } else {
      this.processPlacementError()
    }
  }

  //called by placeShipHandler - confirms placement of ship
  processValidPlacement(){
    this.setState((prevState) => {
      //update number of squares successfully occupied
      prevState.shipSquaresAllocated += prevState.shipsToBePlaced.shift()
      //clear the ship placement coordinates
      prevState.shipCurrentlyBeingPlaced = []

      //check if we need render new instructions
      if (prevState.shipsToBePlaced.length === 0){
        
        // no further ships to place, remove the instruction panel and set player as ready to play
        prevState.readyToPlay = true
        prevState.instructionDisplay = 'none'

        if(this.state.opponentReadyToPlay){
          prevState.primaryPlayerInfo = 'Wait for opponent turn'
          prevState.opponentPlayerInfo = 'making their move'
        } else {
          prevState.primaryPlayerInfo = 'ready to play'
        }
        
        this.socket.emit('readyToPlay', this.state.socketID)
      } else {
        //remove any error text
        prevState.errorText = ''
        //create the new instruction
        let newInstruction = 'Click to place a ship of size: ' + prevState.shipsToBePlaced[0]
        prevState.shipPlacementInstruction = newInstruction
      }
      return prevState
    })
  }

  //called if user tries to make an invalid ship placement
  processPlacementError(){
    //check if there is already error text rendered
    if (this.state.errorText === ''){
      this.setState((prevState) => {
        prevState.errorText = 'Error: please ensure ship is of correct size, placed horizontally or vertically, and does not cross an existing ship. '
        let prevInstruction = prevState.shipPlacementInstruction
        let newInstruction = prevState.errorText + prevInstruction
        prevState.shipPlacementInstruction = newInstruction
        return prevState
      })
    }
  }

  //called when socket detects a ready status
  markOpponentReady(socketID){
    if(socketID !== this.state.socketID){
      this.setState({opponentReadyToPlay: true, opponentPlayerInfo: 'ready to play'})
      //if current player also ready to play, start game
      if(this.state.readyToPlay){
        this.setState({currentTurn: true, primaryPlayerInfo: 'Your turn!'})
      }
    }
  }


  gameOver(id){
    if (id === this.state.socketID){
      this.setState({readyToPlay: false, primaryPlayerInfo: 'You win!', opponentPlayerInfo: 'Opponent loses'})
    } else {
      this.setState({readyToPlay: false, primaryPlayerInfo: 'You lose!', opponentPlayerInfo: 'Opponent wins'})
    }
  }

  

  receiveShotResponse(squareValueAndID){
    //if statement to check this player made the shot, not the opposite player
    if (squareValueAndID.id == this.state.socketID) return
    const squareValue = squareValueAndID.squareValue
    this.setState((prevState) => {
      prevState.trackingBoard.rows[prevState.shotTaken.row][prevState.shotTaken.square] = squareValue
      prevState.shotTaken = {
        row: null,
        square: null
      }
      if(squareValue === 'x'){
        prevState.hitsScored = prevState.hitsScored + 1
        if (prevState.hitsScored === 17){
          this.socket.emit('win', this.state.socketID)
        }
      }
      return prevState
      // this.checkIfWon()
    })
  }

  //on turn, when tracking square is clicked
  handleTrackingSquareClick(rowNum, squareNum){
    //ignore clicks before game has started
    if (!this.state.readyToPlay || !this.state.opponentReadyToPlay) return
    //ignore clicks if not player's turn
    if (!this.state.currentTurn) return

    let coordsAndID = {
      id: this.state.socketID,
      row: rowNum,
      square: squareNum
    }
    //sends coords to other user via socket
    this.setState({shotTaken: coordsAndID}, function(){
      this.socket.emit('shotTaken', coordsAndID)
    })
    //reverse the turns
    this.alternateTurn()
  }

  //called when opponent takes a shot, responds with value of hit or miss
  processShot(coordsAndID){
    //checks that the other player made the shot
    if (coordsAndID.id === this.state.socketID) return

    let row = coordsAndID.row
    let square = coordsAndID.square
    //content of square targeted
    let squareValue = this.state.primaryBoard.rows[row][square]

    if(squareValue === 'x'){
      this.setState((prevState) => {
        prevState.hitsTaken = prevState.hitsTaken + 1
        return prevState
      })
    }
    //sends the info back to the opponent
    let squareValueAndID = {
      squareValue: squareValue,
      id: this.state.socketID
    }

    this.socket.emit('shotResponse', squareValueAndID)
    
    //swap the turn values
    this.alternateTurn()
  }

  //switches the turns
  alternateTurn(){
    this.setState((prevState) => {
      //flip to opposite
      prevState.currentTurn = !prevState.currentTurn
      if (prevState.currentTurn){
        prevState.primaryPlayerInfo = 'Your turn!'
        prevState.opponentPlayerInfo = 'Waiting on your shot'
      } else {
        prevState.primaryPlayerInfo = 'Wait for opponent turn'
        prevState.opponentPlayerInfo = 'Taking their turn'
      }
    })
  }

  render(){

    return (
      <div className="game-container">
        <div className="ship-placement-area">

          <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.primaryBoard} squareClickHandler={this.handlePrimaryBoardClick.bind(this)} title={"Your ships"}/>
          <ShipPlacementInstruction instruction={this.state.shipPlacementInstruction} buttonClickHandler={this.placeShipHandler.bind(this)} displayOption={this.state.instructionDisplay}/>
          <GamePlayInfo text={this.state.primaryPlayerInfo} />

        </div>
        <div className ="tracking-area">

          <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.trackingBoard} squareClickHandler={this.handleTrackingSquareClick.bind(this)} title={"Tracking board"}/>
          <GamePlayInfo text={this.state.opponentPlayerInfo}/>
          
        </div>
      </div>

    )
  }
}

export default GameContainer