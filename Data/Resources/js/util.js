// Get the previous message to a message
//
// @param message {DOM Element} - the message to get the previous message of
// 
function getPreviousMessage(message) {
	let prevMessage = $(message).prev();
	// check wether the last one was the historic messages block
	// and returns its last child if
	if(prevMessage.attr('id') === 'historic_messages'){
		return $('#historic_messages div.line:last-child');
	}
	else{
		return prevMessage;
	}
}
