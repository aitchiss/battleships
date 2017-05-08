var Board = function(numOfSquares){

  var noOfRows = Math.sqrt(numOfSquares)

  if (numOfSquares < 0 || noOfRows % 1 !== 0){
    throw new Error("number of squares must make a grid") 
  }

  this.rows = []

  for (var i= 0; i < noOfRows; i++){
    var newRow = this.createNewRow(noOfRows)
    this.rows[i] = newRow
  }
}

Board.prototype = {

  createNewRow: function(size){
    var row = []
    for (var i = 0; i < size; i++){
      var emptySquare = ''
      row[i] = emptySquare
    }
    return row
  },

  markSquareFull: function(rowNum, SquareNum){
    this.rows[rowNum][SquareNum] = 'x'
  },

  checkIfBoardFull: function(){
    var count = 0
    this.rows.forEach(function(row){
      row.forEach(function(square){
        if (square === 'x'){
          count++
        }
      }.bind(this))
    }.bind(this))

    if (count >= 17){
      return true
    } else {
      return false
    }
  }


}

module.exports = Board