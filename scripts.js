
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

// channel topic
var channelTopic = "";

// # ################# #
// # Textual Callbacks #
// # ################# #

Textual.newMessagePostedToView = function (lineNumber) {

	// get the message object
	var message = document.getElementById('line-' + lineNumber);

	// # ---------------- #
	// # Private Messages #
	if(message.getAttribute("ltype") === "privmsg") {
				
		// color the sender
		var sender = message.querySelector('.sender');
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
			// remove the sender name
			message.querySelector('.senderContainer').style.display = "none";
			// remove the time
			message.querySelector('.time').style.display = "none";
			// thin the padding to visually cluster the lines together
			message.style.paddingTop = "0.1em";
			message.previousSibling.style.paddingBottom = "0.1em";
		}
		// Sender has changed
		else{
			greyBlock = !greyBlock;
		}

		if(greyBlock){
			message.className += " greyBackground";
		}


		// add wrapper for the zoom animation effect to any inline image
		var possibleInlineImages = message.getElementsByClassName('inlineImageCell');
		if(possibleInlineImages.length > 0){
			for(var i = 0; i < possibleInlineImages.length; i++){
				// add the wrapper
				addInlineImageWrapper(possibleInlineImages[i]);
			}
		}


		// update last sender
		lastSenderName = senderName;
	}
	// message was not a private message
	else{
		// whatever message it was, the sender was no user
		// clear the lastSnederName to make the Nickname visible again on the next private message
		// if it happens to be from the same user
		lastSenderName = "";
	}

	// # ------------ #
	// # Topic Change #
	if(message.getAttribute("ltype") === "topic"){

		// get the command code
		var command = message.getAttribute("command");

		// 333 is a "Set By ..." message, which means we had a "Topic is ..." Message before
		// might be the same as before
		if(command === "333") {
			// get the topic message
			var topicMessage = message.previousSibling;
			// just to make sure we really had a 332 ("Topic set ...") message
			if(topicMessage.getAttribute("command") === "332"){
				// get the topic
				var topic = topicMessage.querySelector('.message').textContent.trim().replace('Topic is ', '');

				// the topic was already set
				if(topic === channelTopic) {
					// remove both messages
					topicMessage.parentNode.removeChild(topicMessage);
					message.parentNode.removeChild(message);
				}
			}
		}
		
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

	var tBar = document.getElementById('topic_bar');
	if(tBar){	
		// make the content below the topic bar visible
		document.body.style.paddingTop = tBar.offsetHeight + "px";

		// set the channelTopic variable
		channelTopic =  tBar.textContent;
	}
}


Textual.topicBarValueChanged = function(newTopic) {
	// update the channelTopic state variable
	channelTopic = newTopic;
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

/* takes an .inlineImageCell DOM Node and insertes a .imageWrapper div around the image
 * to enable a zoom effect for the image
 *
 * @param  .inlineImageCell DOM object
 * @return void
 */
var addInlineImageWrapper = function(inlineImageCell) {
	// get the link containing the image
	var imgLinkNode = inlineImageCell.querySelector('a');
	// create a wrapper element
	var wrapper = document.createElement("div");
	wrapper.className += "imageWrapper";

	// put the wrapper around the image
	inlineImageCell.replaceChild(wrapper, imgLinkNode);
	wrapper.appendChild(imgLinkNode);
}