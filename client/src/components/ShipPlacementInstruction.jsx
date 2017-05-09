import React from 'react'

const ShipPlacementInstruction = (props) => {


  return(
    <div className="ship-placement">
      <p>{props.instruction}</p>
      <button onClick={props.buttonClickHandler}>Place ship</button>
    </div>
  )
}

export default ShipPlacementInstruction