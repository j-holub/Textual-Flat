
// colors for the colornumber property
let senderColors = [
	// green
	"2ECC71",
	"64DDBB",
	"#72F274",
	"#92F22A",
	// cyan / blue
	"00CCCC",
	"1DABB8",
	"3498DB",
	"1D628B",
	// yellow / orange
	"F1C40F",
	"FEC606",
	"FF5D19",
	"E74C3C",
	// red / purple
	"B3005A",
	"953163",
	"9B59B6",
	"BD3C4E"
]

/* Colorizes the sendername
 *
 * @param  sender {DOM Element} - the message
 *
 * @return void
 */
function colorizeSender(message) {
	// get the color number
	let sender = $(message).find('.sender');
	let colorNumber = parseInt(sender.attr('colornumber'));
	// sometimes negative colornumbers may appear
	if(colorNumber < 0){
		colorNumber *= -1;
	}
	// return the color HEX
	sender.css({
		 color: senderColors[colorNumber % senderColors.length]
	});
}

/* Colorizes all inline user mentions
 *
 * @param  sender {DOM Element} - the message
 *
 * @return void
 */
function colorizeInlineMentions(message) {
	$(message).find('.inline_nickname').each((index, inline_nick) =>{
		// get the color number
    	let colorNumber = parseInt($(inline_nick).attr('colornumber'));
		// colorize it
		$(inline_nick).css({
			color: senderColors[colorNumber % senderColors.length]
		});
	});
}
