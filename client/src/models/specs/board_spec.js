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

  it('returns board not full if under 17 squares marked', function(){
    var board = new Board(25)
    assert.strictEqual(false, board.checkIfBoardFull())
  })

  it('returns board is full is true if 17 squares marked', function(){
    var board = new Board(25)
    board.rows[0] = ['x', 'x', 'x', 'x', 'x']
    board.rows[1] = ['x', 'x', 'x', 'x', 'x']
    board.rows[2] = ['x', 'x', 'x', 'x', 'x']
    board.rows[3] = ['x', 'x', '', '', '']
    assert.strictEqual(true, board.checkIfBoardFull())
  })

  it('prevents filling of further squares if already full', function(){
    var board = new Board(25)
    board.rows[0] = ['x', 'x', 'x', 'x', 'x']
    board.rows[1] = ['x', 'x', 'x', 'x', 'x']
    board.rows[2] = ['x', 'x', 'x', 'x', 'x']
    board.rows[3] = ['x', 'x', '', '', '']
    board.markSquareFull(3, 2)
    assert.strictEqual('', board.rows[3][2])
  })

  it('initializes with unknown square values, if a tracking board', function(){
    var board = new Board(25, 'tracking')
    assert.strictEqual('?', board.rows[0][0])
  })

  it('can return the number of squares currently occupied', function(){
    var board = new Board(25)
    board.rows[0] = ['x', 'x', 'x', 'x', 'x']
    board.rows[1] = ['x', 'x', 'x', 'x', '']
    assert.strictEqual(9, board.getNumOfOccupiedSquares())
  })


})