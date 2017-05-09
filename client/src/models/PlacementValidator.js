var PlacementValidator = function(){

}

PlacementValidator.prototype = {

  validate: function(expectedSize, coords){
    //check if correct length
    if (expectedSize !== coords.length) return false
    //check if in a row or column
    var inRow = this.isInOneRow(coords)
    var inColumn = this.isInOneColumn(coords)
    var valid = (inRow || inColumn)

    return valid
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

