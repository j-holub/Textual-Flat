
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

// last sender
var lastSenderName;

// grey Message Block for alternating colors to have a better visibility
var greyBlock = false;


// # ################# #
// # Textual Callbacks #
// # ################# #

Textual.newMessagePostedToView = function (lineNumber) {

	// get the message object
	var message = document.getElementById('line-' + lineNumber);

	// check if its a private message
	if(message.getAttribute("ltype") === "privmsg") {
				
		// color the sender
		// line > p > message > senderContainer > sender
		var sender = message.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
		colorizeColorNumber(sender);

		// color any inline_nicknames if present
		var inline_nicknames = message.querySelectorAll('.inline_nickname');
		if(inline_nicknames.length > 0) {
			for (var i = 0; i < inline_nicknames.length; i++) {
				// colorize the nickname
				colorizeColorNumber(inline_nicknames[i]);
			}
		}

		// put messages from the same sender into one visual block
		var senderName = message.querySelector('.sender').textContent;
		
		if(senderName === lastSenderName){
			message.querySelector('.senderContainer').style.display = "none";
			message.querySelector('.time').style.display = "none";


		}
		// Sender has changed
		else{
			greyBlock = !greyBlock;

			// add padding to the message before to sepereate it visibly from the new message
			var prevMsg = message.previousSibling;
			if(prevMsg && prevMsg.getAttribute("ltype") === "privmsg") {
				prevMsg.style.paddingBottom = "0.5em";
			}
		}

		if(greyBlock){
			message.className += " greyBackground";
		}

		// update last sender
		lastSenderName = senderName;
	}


	
}

Textual.viewFinishedLoading = function () {
	Textual.fadeInLoadingScreen(1.00, 1.00);

	setTimeout(function () {
		Textual.scrollToBottomOfView();
	}, 300);
}

Textual.viewFinishedReload = function () {
	Textual.viewFinishedLoading();
}

Textual.viewInitiated = function(viewType, serverHash, channelHash, channelName) {
	// inserts the spinner to the loading screen
	document.getElementById('loading_screen').innerHTML = "<div class=\"spinner\"></div>";
}


// #############
// # Functions #
// #############

/* takes the colornumber property of the sender object, and looks up the color for it
 * in the colorNumbers dictionary. 
 *
 * @param  Object    the object to be colored
 * @return void
 */
var colorizeColorNumber = function(object) {
	// get the color number
	var colorNumber = object.getAttribute("colornumber");
	// set the color to the senderColors dictionary accordingly
	object.style.color = senderColors[colorNumber % 8];
}