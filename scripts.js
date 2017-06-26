
// Includes a JS file into the HTML document
// Selfmade import feature
//
// @param file {String} - The file to import
//
let importFile = function(file) {
	let imported = document.createElement('script');
	imported.src = file;
	document.head.appendChild(imported);
}

// JQuery
importFile('Data/Resources/js/jquery.3.2.1.min.js');

// Modules
importFile('Data/Resources/js/colors.js');
importFile('Data/Resources/js/messages.js');

// #################
// # Configuration #
// #################

// grey Message Block for alternating colors to have a better visibility
let greyBlock = false;

// channel topic
var channelTopic = "";

// # ################# #
// # Textual Callbacks #
// # ################# #

Textual.newMessagePostedToView = function (lineNumber) {

	// get the message object
	let message = $('#line-' + lineNumber);
	let messageType = getMessageType(message);


	switch (messageType) {
		// # ############### #
		// # Private Message #
		// # ############### #
		case 'privmsg':
			// colorize the sender
			colorizeSender(message);
			// colorize inline mentions
			colorizeInlineMentions(message);
			// get some information
			let sender = getSender(message);
			let lastMessage = getPreviousMessage(message);

			// Unify messages of the same sender
			if(getMessageType(lastMessage) === 'privmsg' && sender === getSender(lastMessage)){
				hideSenderAndTime(message);
			}
			// Swap backgrund if it was a new sender
			else{
				greyBlock = !greyBlock;
			}

			// color the message background
			if(greyBlock) {
				addBackground(message);
			}
			break;
		case 'topic':
			break;

		case 'join':
		case 'part':
		case 'quit':
			break;
		default:

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
