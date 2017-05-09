var PlacementValidator = function(){

}

PlacementValidator.prototype = {

  validate: function(expectedSize, coords){
    //check if correct length
    if (expectedSize !== coords.length) return false
    //check if in a row or column
    var inRow = this.isInOneRow(coords)
    var inColumn = this.isInOneColumn(coords)
    //set status to valid if either is true
    var valid = (inRow || inColumn)
    if (inRow){
      valid = this.checkRow(coords)
    }

    return valid
  },

  //checks for ships placed in a row if the squares are in sequential columns
  checkRow: function(coords){
    var columns = []
    //add all of the column references to array and sort sequentially
    coords.forEach(function(square){
      columns.push(square[1])
    }.bind(this))

    columns.sort()
    var sequential = true

    for (var i = 1; i < columns.length; i++){
      var colDifference = columns[i] - columns[i - 1]
      if (colDifference > 1){
        sequential = false
      }
    }

    return sequential
  },

  isInOneRow: function(coords){
    var row = coords[0][0]
    var numInSameRow = 0

    for (var i = 0; i < coords.length; i++){
      if (coords[i][0] === row){
        numInSameRow++
      }
    } 

    if (numInSameRow !== coords.length) return false
    return true

  },

  isInOneColumn: function(coords){
    
    var col = coords[0][1]
    var numInSameCol = 0

    for (var i = 0; i < coords.length; i++){
      if (coords[i][1] === col){
        numInSameCol++
      }
    } 
    
    if (numInSameCol !== coords.length) return false
    return true
  }
}

module.exports = PlacementValidator

