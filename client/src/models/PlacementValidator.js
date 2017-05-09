var PlacementValidator = function(){

}

PlacementValidator.prototype = {

  validate: function(expectedSize, coords){
    if (expectedSize !== coords.length) return false
    var row = coords[0][0]
    var col = coords[0][1]
    var numInSameRow = 0
    var numInSameCol = 0

    var valid = true
    for (var i = 0; i < coords.length; i++){
      if (coords[i][0] === row){
        numInSameRow++
      }
      if (coords[i][1] === col){
        numInSameCol++
      }
    }

    if (numInSameRow !== coords.length && numInSameCol !== coords.length){
      valid = false
    }

    return valid
  }
}

module.exports = PlacementValidator

