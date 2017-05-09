import React from 'react'
import Board from '../models/Board'
import BoardContainer from './BoardContainer'
import io from 'socket.io-client'

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
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

  markSquareFull(rowNum, squareNum){
    this.setState((prevState) => {
      prevState.primaryBoard.markSquareFull(rowNum, squareNum)
      return prevState
    })
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
        <p>Placeholder</p>
        <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.primaryBoard} squareClickHandler={this.markSquareFull.bind(this)}/>
        <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.trackingBoard} squareClickHandler={this.handleTrackingSquareClick.bind(this)}/>
      </div>

    )
  }
}

export default GameContainer