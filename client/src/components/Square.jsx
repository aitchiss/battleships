import React from 'react'

class Square extends React.Component {

  onSquareClick(){
    const row = this.props.rowNo
    const squareId = this.props.squareNo
    this.props.squareClickHandler(row, squareId)
  }

  render(){
    return(
      <div className="square" onClick={this.onSquareClick.bind(this)}>
        {this.props.squareStatus}
      </div>
    )
  }
  

}

export default Square