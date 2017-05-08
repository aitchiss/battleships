var Board = require ('../Board.js')
var assert = require ('assert')

describe('Board tests:', function(){


  it('initializes with correct number of rows', function(){

    var board = new Board(25)
    var rowCount = board.rows.length
    assert.strictEqual(5, rowCount)
  })

  it('only creates squares', function(){
    assert.throws(function(){new Board(2)}, Error, "number of squares must make a grid")
  })

})