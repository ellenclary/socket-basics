var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
// create an io variable and append the contents of the http variable
var io = require('socket.io')(http);
var now = moment();

app.use(express.static(__dirname + '/public'));

// listen for events
// connection is the event
// when you get the connection event, call this function
io.on('connection', function(socket) {
	console.log('User connected via socket.io');

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
		// show the time stamp before the message.
		// valueof is the javassript millisecond version of unix time which is seconds
		message.timestamp = moment().valueOf();
	
		// broadcast to everyone connected except for ourselves
		//socket.broadcast.emit ('message', message);
		// broadcast to everyone including ourselves
		io.emit ('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application.',
		timestamp: moment().valueOf()
	});

});

http.listen(PORT, function() {
	console.log('Server started.');
});