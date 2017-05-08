var Square = function(){
  this.status = 'empty'
}

Square.prototype = {
  markFull: function(){
    this.status = 'full'
  }
}

module.exports = Square