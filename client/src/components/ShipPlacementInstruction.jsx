import React from 'react'

const ShipPlacementInstruction = (props) => {

  console.log(props)
  return(
    <div className="ship-placement" style={{display: props.displayOption}} >
      <p>{props.instruction}</p>
      <button onClick={props.buttonClickHandler}>Place ship</button>
    </div>
  )
}

export default ShipPlacementInstruction