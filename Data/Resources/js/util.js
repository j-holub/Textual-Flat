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
	else{
		return prevMessage;
	}
}


/* Returns the color HEX for the sendernumber of a message
 *
 * @param  sender {DOM Element} - the message
 *
 * @return colorHEX {String}
 */
var colorizeSender = function(message) {
	// colors for the colornumber property
	let senderColors = {
		0: "#1abc9c",
		1: "#2ecc71",
		2: "#3498db",
		3: "#9b59b6",
		4: "#e74c3c",
		5: "#e67e22",
		6: "#f1c40f",
		7: "#953163"
	}
	// get the color number
	let sender = $(message).find('.sender');
	let colorNumber = parseInt(sender.attr('colornumber'));
	// sometimes negative colornumbers may appear
	if(colorNumber < 0){
		colorNumber *= -1;
	}
	// return the color HEX
	sender.css({
		 color: senderColors[colorNumber % 8]
	});
}
