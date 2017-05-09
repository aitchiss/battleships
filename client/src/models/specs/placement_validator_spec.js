var PlacementValidator = require ('../PlacementValidator.js')
var assert = require ('assert')

describe('PlacementValidator tests:', function(){

  var placementValidator = new PlacementValidator()

  it('validates true for ship of size 1, expected size 1', function(){
    assert.strictEqual(true, placementValidator.validate(1, [[0, 0]]))

  })

  })