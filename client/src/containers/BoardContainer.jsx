import React from 'react'
import BoardRow from '../components/BoardRow'


class BoardContainer extends React.Component{

  render(){

    const boardRows = []
    for (var i=0; i< this.props.size; i++){
      boardRows[i] = <BoardRow size={this.props.size} key={i} rowNo={i} rowStatus={this.props.boardStatus.rows[i]}  squareClickHandler={this.props.squareClickHandler}/>
    }

    return(
      <div className="board">
        {boardRows}
      </div>
    )
  }

  
}

export default BoardContainer