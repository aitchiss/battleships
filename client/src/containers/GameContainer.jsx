import React from 'react'
import Board from '../models/Board'
import PrimaryBoard from './PrimaryBoard'

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      primaryBoard: new Board(props.boardSize)
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
        <PrimaryBoard size={this.state.primaryBoard.rows.length} boardStatus={this.state.primaryBoard} squareClickHandler={this.markSquareFull.bind(this)}/>
      </div>

    )
  }
}

export default GameContainer