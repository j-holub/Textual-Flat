
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
importFile('Data/Resources/js/correction.js');
importFile('Data/Resources/js/images.js');
importFile('Data/Resources/js/info.js');
importFile('Data/Resources/js/messages.js');

// #################
// # Configuration #
// #################

// grey Message Block for alternating colors to have a better visibility
let greyBlock = false;


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
			// see if the message is a correction of the previous message
			if(messageIsCorrection(message)){
				handleCorrect(message);
			}
			// handle the normal message
			else{
				// colorize the sender
				colorizeSender(message);
				// colorize inline mentions
				colorizeInlineMentions(message);
				// add the bottom class, because at this point it is the last message
				// of this sender
				addBottomMessageStyle(message);
				// get some information
				let sender = getSender(message);
				let lastMessage = getPreviousMessage(message);

				// same Sender
				if(getMessageType(lastMessage) === 'privmsg' && sender === getSender(lastMessage)){
					hideSenderAndTime(message);
					// remove the bottom message style from the last message
					removeBottomMessageStyle(lastMessage);
				}
				// new Sender
				else{
					addTopMessageStyle(message);
					greyBlock = !greyBlock;
				}

				// style the images if present
				handleInlineImages(message);

				// color the message background
				if(greyBlock) {
					addBackground(message);
				}
			}
			break;
		// # ############ #
		// # Topic Change #
		// # ############ #
		case 'topic':
			handleTopicChange(message);
			break;
		// # ########### #
		// # Mode Change #
		// # ########### #
		case 'mode':
			handleModeChange(message);
			break;
		// # ################## #
		// # Join / Part / Quit #
		// # ################## #
		case 'join':
		case 'part':
		case 'quit':
			// hide the user's own status messages
			hideIfOwn(message);
			break;
		default:

	}


}

Textual.viewFinishedLoading =  () => {
	Textual.fadeOutLoadingScreen(1.00, 1.00);
	setTimeout( () => {
		Textual.scrollToBottomOfView();
	}, 300);
}

Textual.viewFinishedReload =  () => {
	Textual.viewFinishedLoading();
}

Textual.viewInitiated = (viewType, serverHash, channelHash, channelName) => {
	// inserts the spinner to the loading screen
	$('#loading_screen').html("<div class=\"spinner\"></div>")
	//
	let topicBar = $('#topic_bar');
	if(topicBar){
		// make the content below the topic bar visible
		console.log(tbar.innerHeight());
		$('body').css({
			'margin-top': tbar.innerHeight() + "px"
		});
	}
}
