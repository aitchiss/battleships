var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html')
})

app.use(express.static('client/build'))

io.on('connection', function(socket){
  socket.on('shotTaken', (coords) => {

    io.sockets.emit('shotTaken', coords)
  })

  socket.on('shotResponse', (squareValueAndID) => {

    io.sockets.emit('shotResponse', squareValueAndID)
  })

  socket.on('readyToPlay', (id) => {
    io.sockets.emit('readyToPlay', id)
  })

})


http.listen(3000, function (){
  console.log('app listening at 3000')
})