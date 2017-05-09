import React from 'react'

const Square = (props) => {

  const onSquareClick = function(){
    const row = props.rowNo
    const squareId = props.squareNo
    props.squareClickHandler(row, squareId)
  }

  
  return(
    <div className="square" onClick={onSquareClick.bind(this)}>
      {props.squareStatus}
    </div>
  )
  
  

}

export default Square