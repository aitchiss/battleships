var PlacementValidator = function(){

}

PlacementValidator.prototype = {

  validate: function(expectedSize, coords){
    if (expectedSize !== coords.length) return false

    return true
  }
}

module.exports = PlacementValidator

