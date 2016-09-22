
// #################
// # Configuration #
// #################

// colors for the colornumber property
var senderColors = {
	0: "#1abc9c",
	1: "#2ecc71",
	2: "#3498db",
	3: "#9b59b6",
	4: "#e74c3c",
	5: "#e67e22",
	6: "#f1c40f",
	7: "#953163"
}


// # ################# #
// # Textual Callbacks #
// # ################# #

Textual.newMessagePostedToView = function (lineNumber) {

	// get the message object
	var message = document.getElementById('line-' + lineNumber);

	// check if its a private message
	if(message.getAttribute("ltype") === "privmsg") {
				
		colorSender(message);
	}

	
}



// #############
// # Functions #
// #############

/* takes the colornumber property of the sender object, and looks up the color for it
 * in the colorNumbers dictionary. 
 *
 * @param  Object    the line object of the message (must be of the ltype privmsg)
 * @return void
 */
var colorSender = function(lineObject) {
	// line > p > message > senderContainer > sender
	var sender = lineObject.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
	// get the color number
	var colorNumber = sender.getAttribute("colornumber");
	// set the color to the senderColors dictionary accordingly
	sender.style.color = senderColors[colorNumber % 8];
}