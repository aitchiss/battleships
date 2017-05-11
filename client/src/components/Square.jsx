import React from 'react'

const Square = (props) => {

  const onSquareClick = function(){
    const row = props.rowNo
    const squareId = props.squareNo
    props.squareClickHandler(row, squareId)
  }

  const determineColour = function(squareValue){
    if (squareValue === ''){
      return '#3EB0E1'
    } else if (squareValue === 'x') {
      return '#FFA43E'
    } else {
      return '#A7BAC2'
    }
  }

  let colour = determineColour(props.squareStatus)
  
  return(
    <div className="square" style={{backgroundColor: colour}} onClick={onSquareClick.bind(this)}>
    </div>
  )

}

export default Square