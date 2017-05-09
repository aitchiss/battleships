var PlacementValidator = function(){

}

PlacementValidator.prototype = {

  validate: function(expectedSize, coords){
    //check if correct length
    if (expectedSize !== coords.length) return false

    //check if in a row or column
    var inRow = this.isInOneRow(coords)
    var inColumn = this.isInOneColumn(coords)
    //set status to valid if either is true - return false if not true
    var valid = (inRow || inColumn)
    if (!valid) return false

    //check for validate sequential placement within row or column
    if (inRow){
      valid = this.checkRow(coords)
    } else {
      valid = this.checkColumn(coords)
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
    return this.checkIfSequential(columns)
  },

  checkIfSequential: function(numArray){
    var sequential = true
    for (var i = 1; i < numArray.length; i++){
      var difference = numArray[i] - numArray[i - 1]
      if (difference > 1){
        sequential = false
      }
    }
    return sequential
  },

  checkColumn: function(coords){
    var rows = []

    coords.forEach(function(square){
      rows.push(square[0])
    }.bind(this)) 

    rows.sort()
    return this.checkIfSequential(rows) 
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

