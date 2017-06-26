/* Gets the previous message to a message
 *
 * @param  message {DOM Element} - the message to get the previous message of
 *
 * @return void
 */
function getPreviousMessage(message) {
	let prevMessage = $(message).prev();
	// check wether the last one was the historic messages block
	// and returns its last child if
	if(prevMessage.attr('id') === 'historic_messages'){
		return $('#historic_messages div.line:last-child');
	}
	else if(prevMessage.attr('id') === 'mark'){
		return getPreviousMessage(prevMessage);
	}
	else{
		return prevMessage;
	}
}


/* Gets the sender name to a message
 *
 * @param  message {DOM Element} - the message
 *
 * @return senderName {String}
 */
function getSender(message) {
	// drop the last :
	return $(message).find('.sender').text().slice(0, -1)
}

/* Gets the message type
 *
 * @param  message {DOM Element} - the message
 *
 * @return senderName {String}
 */
function getMessageType(message) {
	return $(message).attr('ltype');
}

/* Hides the Sender of a message
 *
 * @param message {DOM Element} - the message
 *
 * @return vooid
 */
function hideSenderAndTime(message) {
	// hide sender
	$(message).find('.sender').css({
		display: 'none'
	});
	// hide time
	$(message).find('.time').css({
		display: 'none'
	});
}
