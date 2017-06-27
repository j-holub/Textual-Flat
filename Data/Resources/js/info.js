
// channel topic
let channelTopic = "";
// channel mode
let channelMode  = "";

/* Hides a join / part / quit message if it was the user's
 *
 * @param message {DOM Element} - the message
 *
 * @return vooid
 */
function hideIfOwn(message) {
	// get the users Nickname
	app.localUserNickname((nickname) => {
		let nicknameRegex = new RegExp(nickname + '_?');
		if($(message).find('b').text().search(nicknameRegex) != -1){
			$(message).remove();
		}
	});
}

/* Updates the channelMode status variable and deletes the mode set message
 * if the mode hasn't changed
 *
 * @param message {DOM Element} - the message
 *
 * @return vooid
 */
function handleModeChange(message) {
	let newMode = $(message).find('b').text();
	if(channelMode === newMode){
		$(message).remove();
	}
	channelMode = newMode;
}

/* Updates the channelTopic status variable and deletes the topic change message
 * if the topic hasn't changed
 *
 * @param message {DOM Element} - the message
 *
 * @return vooid
 */
function handleTopicChange(message) {
	// Set By message
	if(getCommand(message) === '333'){
		let prevMessage = getPreviousMessage(message);
		// Topic is message
		if(getCommand(prevMessage) === '332'){
			let newTopic = $(prevMessage).find('.message').text().replace('Topic is', '').trim();
			// delete the messages if the topic hasn't changed
			if(newTopic === channelTopic){
				$(message).remove()
				$(prevMessage).remove();
			}
			// update the topic state
			channelTopic = newTopic;
		}
	}
}
