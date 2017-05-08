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

  render(){

    return (
      <div className="game-container">
        <p>Placeholder</p>
        <PrimaryBoard size={this.state.primaryBoard.rows.length}/>
      </div>

    )
  }
}

export default GameContainer