/*!
 * jQuery Image Resize Plugin v2.1.3 minified
 * https://github.com/adeelejaz/jquery-image-resize
 *
 * Modified by Tim Kindberg
 *
 * Copyright (c) 2013 Adeel Ejaz
 * Released under the MIT license
 */
;(function( $ ) {

	$.fn.imageMaxSize = function( params ) {

		var aspectRatio = 0;

		// We cannot do much unless we have one of these
		if ( !params.height && !params.width ) {
			return this;
		}

		// Calculate aspect ratio now, if possible
		if ( params.height && params.width ) {
			aspectRatio = params.width / params.height;
		}

		// Attach handler to load
		// Handler is executed just once per element
		// Load event required for Webkit browsers
		return this.on( "load", function() {

			// Remove all attributes and CSS rules
			this.removeAttribute( "height" );
			this.removeAttribute( "width" );
			this.style.height = this.style.width = "";

			var imgHeight = this.height
				, imgWidth = this.width
				, imgAspectRatio = imgWidth / imgHeight
				, bxHeight = params.height
				, bxWidth = params.width
				, bxAspectRatio = aspectRatio;

			// Work the magic!
			// If one parameter is missing, we just force calculate it
			if ( !bxAspectRatio ) {
				if ( bxHeight ) {
					bxAspectRatio = imgAspectRatio + 1;
				} else {
					bxAspectRatio = imgAspectRatio - 1;
				}
			}

			// Only resize the images that need resizing
			if ( (bxHeight && imgHeight > bxHeight) || (bxWidth && imgWidth > bxWidth) ) {

				if ( imgAspectRatio > bxAspectRatio ) {
					bxHeight = ~~ ( imgHeight / imgWidth * bxWidth );
				} else {
					bxWidth = ~~ ( imgWidth / imgHeight * bxHeight );
				}

				this.height = bxHeight;
				this.width = bxWidth;
			}
		})
		.each(function() {

			// Trigger load event (for Gecko and MSIE)
			if ( this.complete ) {
				$( this ).trigger( "load" );
			}

			// This fixes IE9 issue
			this.src = this.src;
		});
	};

})( jQuery );