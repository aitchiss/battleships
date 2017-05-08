import React from 'react'
import BoardRow from '../components/BoardRow'


class PrimaryBoard extends React.Component{

  render(){

    const boardRows = []
    for (var i=0; i< this.props.size; i++){
      boardRows[i] = <BoardRow size={this.props.size} key={i}/>
    }

    return(
      <div className="board">
        <p>Placeholder</p>
        {boardRows}
      </div>
    )
  }

  
}

export default PrimaryBoard