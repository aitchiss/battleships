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

  socket.on('shotResponse', (squareValue) => {

    io.sockets.emit('shotResponse', squareValue)
  })

})


http.listen(3000, function (){
  console.log('app listening at 3000')
})