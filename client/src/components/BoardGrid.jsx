import React from 'react'
import BoardRow from '../components/BoardRow'


const BoardGrid = (props) => {

  const boardRows = []
  for (var i=0; i< props.size; i++){
    boardRows[i] = <BoardRow size={props.size} key={i} rowNo={i} rowStatus={props.boardStatus.rows[i]}  squareClickHandler={props.squareClickHandler}/>
  }

  return(
    <div className="board">
      <h3>{props.title}</h3>
      {boardRows}
    </div>
  )
  

  
}

export default BoardGrid