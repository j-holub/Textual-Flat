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

/* Gets the command attribute from a amessage
 *
 * @param message {DOM Element} - the message
 *
 * @return message command {String}
 */
function getCommand(message) {
	return $(message).attr('command');
}

/* Returns the message content
 *
 * @param message {DOM Element} - the message
 *
 * @return message content {String}
 */
function getMessageContent(message) {
	return $(message).find('.innerMessage').text().trim();
}

/* Hides the Sender of a message
 *
 * @param message {DOM Element} - the message
 *
 * @return void
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

/* Adds the background color class
 *
 * @param message {DOM Element} - the message
 *
 * @return void
 */
function addBackground(message) {
	$(message).addClass('greyBackground');
}

/* Adds the top message class to a message,
 *
 * @param message {DOM Element} - the message
 *
 * @return void
 */
function addTopMessageStyle(message) {
		$(message).addClass('top');
}

/* Adds the bottom message class to a message,
 *
 * @param message {DOM Element} - the message
 *
 * @return void
 */
function addBottomMessageStyle(message) {
		$(message).addClass('bottom');
}

/* Removes the bottom message class of the message
 *
 * @param message {DOM Element} - the message
 *
 * @return void
 */
function removeBottomMessageStyle(message) {
	$(message).removeClass('bottom');
}
