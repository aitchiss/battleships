import React from 'react'
import Square from './Square'

const BoardRow = (props) => {

  const squares = []
  for (let i= 0; i < props.size; i++){
    squares[i] = <Square key={i} rowNo={props.rowNo} squareNo={i} squareStatus={props.rowStatus[i]}/>
  }

  return(
    <div className="row">
      {squares}
    </div>
  )

}

export default BoardRow