
var Board = function(numOfSquares){

  if (numOfSquares < 0 || Math.sqrt(numOfSquares) % 1 !== 0){
    throw new Error("number of squares must make a grid") 
  }

  var noOfRows = Math.sqrt(numOfSquares)
  this.rows = []

  for (var i= 0; i < noOfRows; i++){
    var newRow = []
    this.rows[i] = newRow
  }
}

module.exports = Board