var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
// create an io variable and append the contents of the http variable
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// listen for events
// connection is the event
// when you get the connection event, call this function
io.on('connection', function(socket) {
	console.log('User connected via socket.io!');

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
		// broadcast to everyone connected except for ourselves
		socket.broadcast.emit ('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application.'
	});

});

http.listen(PORT, function() {
	console.log('Server started.');
});