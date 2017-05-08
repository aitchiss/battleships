var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html')
})

app.use(express.static('client/build'))


http.listen(3000, function (){
  console.log('app listening at 3000')
})