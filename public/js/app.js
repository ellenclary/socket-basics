var socket = io();

// all of our application's javascript

socket.on('connect', function () {
	console.log ('Connected to socket.io server')
});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);
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