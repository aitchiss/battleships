
var Board = function(numOfSquares){
  var noOfRows = Math.sqrt(numOfSquares)
  this.rows = []

  for (var i= 0; i < noOfRows; i++){
    var newRow = []
    this.rows[i] = newRow
  }
}

module.exports = Board