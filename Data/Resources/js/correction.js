
/* Checks whether the message is a correction of the previous message or not
 * This is only the case if the prevous message is of the same sender as this
 * message.
 * A single character message is treated as a correction
 *
 * @param  message {DOM Element} - the message
 *
 * @return {boolean}
 */
function messageIsCorrection(message) {
	let prevMessage = getPreviousMessage(message);
	if(getSender(message) === getSender(prevMessage)){
		if(getMessageContent(message).length == 1){
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

/* Handlels the correction of a message
 * Single character messages are appened to the previous message
 *
 * @param  message {DOM Element} - the message
 *
 * @return void
 */
function handleCorrect(message) {
	if(getMessageContent(message).length == 1){
		singleCharacterCorrect(message)
	}
}

/* Appends the single letter to the previous message, adds CSS classes
 * to trigger the animations and deletes the original message
 *
 * @param  message {DOM Element} - the message
 *
 * @return void
 */
function singleCharacterCorrect(message) {
	let prevMessage = getPreviousMessage(message);
	let prevContent = getMessageContent(prevMessage);
	let content 	= getMessageContent(message);

	// add the letter to the previous message
	$(prevMessage).find('.innerMessage').html(prevContent + '<span class="correct">' + content + '</span>');
	// add the classes to trigger the animation
	$(prevMessage)
		.addClass('lineCorrection')
		.find('.correct')
			.addClass('letterCorrection');
	//  delete the original message
	$(message).remove();
}
