var Board = function(numOfSquares, type){

  //checks the size of board to create, and throws error if it doesn't make a grid
  var noOfRows = Math.sqrt(numOfSquares)
  if (numOfSquares < 0 || noOfRows % 1 !== 0){
    throw new Error("number of squares must make a grid") 
  }

  this.rows = []
  //creates rows and adds to the array
  for (var i= 0; i < noOfRows; i++){
    var newRow = this.createNewRow(noOfRows, type)
    this.rows[i] = newRow
  }
}


Board.prototype = {

  createNewRow: function(size, type){
    var row = []
    for (var i = 0; i < size; i++){
      if(type === 'tracking'){
        //distinguish between unknown square and empty square
        var initialSquare = '?'
      } else {
        var initialSquare = ''
      }
      row[i] = initialSquare
    }
    return row
  },

  markSquareFull: function(rowNum, SquareNum){
    if (!this.checkIfBoardFull()){
      this.rows[rowNum][SquareNum] = 'x'
    }
  },

  checkIfBoardFull: function(){
    var count = this.getNumOfOccupiedSquares()

    if (count >= 17){
      return true
    } else {
      return false
    }
  },

  getNumOfOccupiedSquares(){
    var count = 0
    this.rows.forEach(function(row){
      row.forEach(function(square){
        if (square === 'x'){
          count++
        }
      }.bind(this))
    }.bind(this))

    return count
  }



}

module.exports = Board