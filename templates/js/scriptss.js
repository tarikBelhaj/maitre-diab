
		/* <![CDATA[ */
		var NinjaContactFormOpts = {"ajaxurl":"http:\/\/www.laventlaw.com\/wp-admin\/admin-ajax.php","sidebar_type":"slide","theme":"minimalistic","sidebar_pos":"right","flat_socialbar":"top","base_color":"{\"flat\":\"#2b93c0\",\"cube\":\"#c0392b\",\"minimalistic\":\"#c70f31\",\"aerial\":\"#292929\"}","humantest":"","fade_content":"light","label":"1","label_top":"50%","label_vis":"visible","label_scroll_selector":"","label_mouseover":"","bg":"none","togglers":"","path":"http:\/\/www.laventlaw.com\/wp-content\/plugins\/ninja-contact-form\/img\/","scroll":"custom","send_more_text":"Send more","try_again_text":"Try again","close_text":"Close","sending_text":"Sending","msg_fail_text":"Something went wrong while sending your message","errors":{"required":"* Please enter %%","min":"* %% must have at least %% characters.","max":"* %% can have at most %% characters.","matches":"* %% must match %%.","less":"* %% must be less than %%","greater":"* %% must be greater than %%.","numeric":"* %% must be numeric.","email":"* %% must be a valid email address.","ip":"* %% must be a valid ip address.","answer":"* Wrong %%"},"id1":{"success":"Your message was successfully sent!"},"social":[],"plugin_ver":"3.1.11"};
	/* ]]> */
		(function($){

			NinjaContactFormOpts.callbacks = {
				noop: function(){},"id1" : function(){}		}

			var insertListener = function(event){
				if (event.animationName == "bodyArrived") {
					afterBodyArrived();
				}
			}
			var timer;

			if (document.addEventListener && false) {
				document.addEventListener("animationstart", insertListener, false); // standard + firefox
				document.addEventListener("MSAnimationStart", insertListener, false); // IE
				document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
			} else {
				timer = setInterval(function(){
					if (document.body) {
						clearInterval(timer);
						afterBodyArrived();
					}
				},14);
			}

			function afterBodyArrived () {

				if (!window.NinjaContactFormOpts || window.NinjaSidebar) return;

				var opts = window.NinjaContactFormOpts;
				var nksopts = window.NKS_CC_Opts;
				var subopts = window.NKSubOpts;
				var $body = $('body');

				var TYPE = NinjaContactFormOpts.sidebar_type;
				var $bodybg = $('<div id="ncf-body-bg"/>').prependTo($body);
				var b = document.body;
				var bodyCss;

				// fix onload
				$(function(){
					setTimeout(function() {

						if (!$bodybg.parent().is($body)) {
							$body.prepend($bodybg).prepend($('.ncf_trigger_tabs')).prepend($('#ncf_sidebar')).append($('#ncf-overlay-wrapper'));
						}

						if (TYPE === 'push') { $bodybg.css('backgroundColor', $body.css('backgroundColor')) }

					},0)
				})

				if (TYPE === 'push') {

					bodyCss = {
						'backgroundColor':$body.css('backgroundColor'),
						'backgroundImage':$body.css('backgroundImage'),
						'backgroundAttachment':$body.css('backgroundAttachment'),
						'backgroundSize':$body.css('backgroundSize'),
						'backgroundPosition':$body.css('backgroundPosition'),
						'backgroundRepeat':$body.css('backgroundRepeat'),
						'backgroundOrigin':$body.css('backgroundOrigin'),
						'backgroundClip':$body.css('backgroundClip')
					};

					if (bodyCss.backgroundColor.indexOf('(0, 0, 0, 0') + 1 || bodyCss.backgroundColor.indexOf('transparent') + 1 ) {
						bodyCss.backgroundColor = '#fff';
					}

					if (bodyCss.backgroundAttachment === 'fixed') {
						NinjaContactFormOpts.isBgFixed = true;
						bodyCss.position = 'fixed';
						bodyCss.bottom = 0;
						bodyCss.backgroundAttachment = 'scroll';
					} else {
						bodyCss.height = Math.max(
							b.scrollHeight, document.documentElement.scrollHeight,
							b.offsetHeight, document.documentElement.offsetHeight,
							b.clientHeight, document.documentElement.clientHeight
						)
					}

					$bodybg.css(bodyCss);

				} else {
					//$body.addClass('nks_sidebar_slide')
				}

				setTimeout(function(){
					$(function(){

						var $tabs = $('.nks_cc_trigger_tabs');
						var $btn;
						var sel;
						var nkspos = nksopts && nksopts.sidebar_pos;
						var subpos = subopts && subopts.sidebar_pos;

						if ( $tabs.length && (opts.sidebar_pos === nkspos || opts.sidebar_pos === subpos) ) {

							$btn = $('<span class="fa-stack fa-lg ncf-tab-icon ram fa-2x" > <i class="fa ncf-icon-square fa-stack-2x "></i> <i class="fa ncf-icon-mail-1 fa-stack-1x fa-inverse"></i> </span>');

							if (opts.sidebar_pos === nkspos) {
								$tabs.filter(':has(".nks-tab")').prepend($btn);
								triggerEvent();
								return;
							}

							if (opts.sidebar_pos === subpos) {
								$tabs.filter(':has(".nksub-tab-icon")').prepend($btn);
								triggerEvent();
								return;
							}


						} else {
							$tabs = $('<div class="nks_cc_trigger_tabs ncf_tab ncf_label_visible" id="hid1"><span class="fa-stack ncf-tab-icon  fa-lg fa-2x"> <i class="fa ncf-icon-square fa-stack-2x "></i> <i class="fa ncf-icon-mail-1 fa-stack-1x fa-inverse"></i> </span></div>');
							$body.append($tabs);
						}

						triggerEvent();
		//
					});
				});
			}

			function triggerEvent(){
					$(document).trigger('ncf_ready');
			}

		})(jQuery)