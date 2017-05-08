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

  it('creates rows with correct length', function(){
    var board = new Board(25)
    assert.strictEqual(5, board.rows[0].length)
  })

  it('initializes with empty squares in each row', function(){
    var board = new Board(25)
    assert.strictEqual('', board.rows[0][0])
  })

  it('can have squares changed to full', function(){
    var board = new Board(25)
    board.markSquareFull(0, 0)
    assert.strictEqual('x', board.rows[0][0])
  })

})