import React from 'react'
import Board from '../models/Board'

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      primaryBoard: new Board(props.boardSize)
    }
    
  }

  render(){

    return (
      <p>Placeholder</p>

    )
  }
}

export default GameContainer