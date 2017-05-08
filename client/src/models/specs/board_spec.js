var Board = require ('../Board.js')
var assert = require ('assert')

describe('Board tests:', function(){


  it('initializes with correct number of rows', function(){

    var board = new Board(25)
    var rowCount = board.rows.length
    assert.strictEqual(5, rowCount)
  })

})