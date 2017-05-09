import React from 'react'
import Board from '../models/Board'
import BoardContainer from './BoardContainer'

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      primaryBoard: new Board(props.boardSize),
      trackingBoard: new Board(props.boardSize)
    }
  }

  markSquareFull(rowNum, SquareNum){
    this.setState((prevState) => {
      prevState.primaryBoard.markSquareFull(rowNum, SquareNum)
      return prevState
    })
  }

  render(){

    return (
      <div className="game-container">
        <p>Placeholder</p>
        <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.primaryBoard} squareClickHandler={this.markSquareFull.bind(this)}/>
        <BoardContainer size={this.state.primaryBoard.rows.length} boardStatus={this.state.trackingBoard} />
      </div>

    )
  }
}

export default GameContainer