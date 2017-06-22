
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

		let senderName = message.querySelector('.sender').textContent;
		// first check if the message is a correction
		var messageContent = message.getElementsByClassName('innerMessage')[0].textContent.trim();
		// if it's a single character it most likely was a correction to the previous line
		if(messageContent.length == 1){
			// add it to the previous line
			let prevMessage = previousMessage(message);


			if(prevMessage){
				// get previous message type
				let prevType  = prevMessage.getAttribute("ltype");
				// if the previous message was from the same sender as this message
				// add the single character to the previous message
				if(prevType === "privmsg" && prevMessage.querySelector('.sender').textContent === senderName){
					prevMessage = prevMessage.getElementsByClassName('innerMessage')[0];
					prevMessage.innerHTML = prevMessage.textContent.trim() + "<span class=\"correct\">" + messageContent + "</span>";
					prevMessage.getElementsByClassName('correct')[0].classList.add("letterCorrection");
					// animate the previous line
					previousMessage(message).classList.add("lineCorrection");
					// delete the original message
					message.parentNode.removeChild(message);
				}
			}
		}
		// if it is longer, treat it as a normal message
		else{
			// color the sender
			colorizeColorNumber(message.querySelector('.sender'));

			// color any inline_nicknames if present
			var inline_nicknames = message.querySelectorAll('.inline_nickname');
			if(inline_nicknames.length > 0) {
				app.localUserNickname(function(username) {
					for (var i = 0; i < inline_nicknames.length; i++) {
						// check if it is the users name and color it in the user color
						if(inline_nicknames[i].textContent.toLowerCase().match(username.toLowerCase())){
							inline_nicknames[i].style.color = "#00cccc";
						}
						// color other users according to their color number
						else{
							// colorize the nickname
							colorizeColorNumber(inline_nicknames[i]);
						}
					}
				});
			}

			if(senderName === lastSenderName){
				// remove the sender name
				message.querySelector('.senderContainer').style.display = "none";
				// remove the time
				message.querySelector('.time').style.display = "none";
				// thin the padding to visually cluster the lines together
				message.style.paddingTop = "0.1em";
				previousMessage(message).style.paddingBottom = "0.1em";
			}
			// Sender has changed
			else{
				greyBlock = !greyBlock;
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
	}
	// message was not a private message
	else{
		// whatever message it was, the sender was no user but the client/server
		// set lastSenderName to "textualClient" to continue the color alternation through
		// client messages

		if(!(lastSenderName === "textualClient")){
			lastSenderName = "textualClient";
			greyBlock = !greyBlock;
		}
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
			if(topicMessage && topicMessage.getAttribute("command") === "332"){
				// get the topic
				var topic = topicMessage.querySelector('.message').textContent.replace('Topic is', '').trim()
				// generalize the whitespaces
				topic = topic.replace(/\s/g, '');

				// the topic was already set
				if(topic === channelTopic) {
					// remove both messages
					topicMessage.parentNode.removeChild(topicMessage);
					message.parentNode.removeChild(message);
				}
			}
		}

	}

	// # ----------- #
	// # Join / Part #
	if(message.getAttribute("ltype") === "join" || message.getAttribute("ltype") === "part" || message.getAttribute("ltype") === "quit"){
		// hide your own join and part messages
		app.localUserNickname(function(nickname){
			// query Nickname and Nickname_
			var nicknameRegex = new RegExp(nickname + "_?");
			if(message.querySelector('b').textContent.search(nicknameRegex) != -1){
				message.parentNode.removeChild(message);
			}
		});
	}

	// if the previous message was a debug notice set greyBlock to false to color
	// the message in white
	var prevMessage = previousMessage(message);
	if(prevMessage && (typeof prevMessage === "object") && (prevMessage.getAttribute("ltype") === "debug")){
		greyBlock = false;
	}


	// color the message if needed
	if(greyBlock){
		message.className += " greyBackground";
	}

}

Textual.viewFinishedLoading = function () {
	Textual.fadeOutLoadingScreen(1.00, 1.00);

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
		document.body.style.marginTop = tBar.clientHeight + "px";

		// set the channelTopic variable
		channelTopic =  tBar.textContent.replace(/\s/g, '');
	}
}


Textual.topicBarValueChanged = function(newTopic) {
	// update the channelTopic state variable
	channelTopic = newTopic.replace(/\s/g, '');;
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
	// sometimes negative colornumbers may appear
	if(colorNumber < 0){
		colorNumber *= -1;
	}
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

/* gets the previous message
 * sometimes non-message divs are between messages and this function will skip them and get
 * the message before that div
 *
 * @param  the message div object
 * @return the div object of the previous message
 */
var previousMessage =  function(message) {
	var prev = message.previousSibling;
	if(prev && (prev.id === "mark" || prev.id === "historic_messages")){
		return prev.previousSibling;
	}
	else{
		return prev;
	}
}
