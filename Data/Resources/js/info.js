
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
