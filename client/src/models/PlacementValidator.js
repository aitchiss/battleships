var PlacementValidator = function(){

}

PlacementValidator.prototype = {

  validate: function(expectedSize, coords){
    if (expectedSize !== coords.length) return false
    var row = coords[0][0]
    var numInSameRow = 0

    var valid = true
    for (var i = 0; i < coords.length; i++){
      if (coords[i][0] === row){
        numInSameRow++
      }
    }

    if (numInSameRow !== coords.length){
      valid = false
    }

    return valid
  }
}

module.exports = PlacementValidator

