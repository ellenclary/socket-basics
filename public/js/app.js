var socket = io();

// all of our application's javascript

socket.on('connect', function () {
	console.log ('Connected to socket.io server')
});

socket.on('message', function (message) {
	// get the utc time
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message:');
	console.log(message.text);

	// select the css class messages
	// append method - add to the end
	jQuery('.messages').append('<p><strong>' + momentTimestamp.format('h:mm a') + ': </strong>' + message.text + '</p>');
})

// Handles submitting of new message
// use a jQuery tag selector - select our form by id name message-form
var $form = jQuery('#message-form');

// event name submit
$form.on('submit', function (event) {
	// method on the event object
	// handle form submission on our own
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		// find a name attribute that exactly equals message
		text: $message.val()
	});

	// erase the message in the text field by accessing the jQuery element
	// send an empty string into the val method
	$message.val('');
});