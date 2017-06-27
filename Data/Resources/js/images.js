
/* Adds the image wrapper to all inline images in the message, if present
 * This enables a zoom & blur effect on the image
 *
 * @param  message {DOM Element} - the message
 *
 * @return void
 */
function handleInlineImages(message) {
	$(message).find('.inlineImageCell').each((index, image) => {
		$(image).wrap('<div class="imageWrapper"></div>')
	});
}
