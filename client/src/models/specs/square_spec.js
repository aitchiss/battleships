var Square = require ('../Square.js')
var assert = require ('assert')

describe('Square tests:', function(){

  var square

  beforeEach(function(){

    square = new Square()
  })

  it('starts with empty status', function(){
    assert.strictEqual('empty', square.status)
  })

  it('can be marked as full', function(){
    square.markFull()
    assert.strictEqual('full', square.status)
  })
})