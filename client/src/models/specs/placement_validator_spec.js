var PlacementValidator = require ('../PlacementValidator.js')
var assert = require ('assert')

describe('PlacementValidator tests:', function(){

  var placementValidator = new PlacementValidator()

  it('validates true for ship of size 1, expected size 1', function(){
    assert.strictEqual(true, placementValidator.validate(1, [[0, 0]]))
  })

  it('returns false for ship of wrong length', function(){
    var coords = [[1, 0], [2, 1]]
    assert.strictEqual(false, placementValidator.validate(1, coords))
  })

  it('returns true if all on same row and correct length', function(){
    var coords = [[1, 0], [1, 1], [1, 2]]
    assert.strictEqual(true, placementValidator.validate(3, coords))
  })

  it('returns false if not all on same row but correct length', function(){
    var coords = [[1, 2], [2, 5], [4, 1]]
    assert.strictEqual(false, placementValidator.validate(3, coords))
  })

  it('returns true if all in same column and correct length', function(){
    var coords = [[1, 2], [2, 2], [3, 2]]
    assert.strictEqual(true, placementValidator.validate(3, coords))
  })

  it('returns false if not all in same column or row, but correct length', function(){
    var coords = [[1, 9], [2, 2], [4, 1]]
    assert.strictEqual(false, placementValidator.validate(3, coords))
  })

  it('returns false if ship placed in row covers non sequential columns', function(){
    var coords = [[1, 1], [1, 2], [1, 5]]
    assert.strictEqual(false, placementValidator.validate(3, coords))
  })

  it('returns true if columns are sequential, but provided in wrong order', function(){
    var coords = [[1, 1], [1, 3], [1, 2]]
    assert.strictEqual(true, placementValidator.validate(3, coords))
  })

  })