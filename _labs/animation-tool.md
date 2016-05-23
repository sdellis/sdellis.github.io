---
layout: labs-default
title: Animated Constellation Creation Interface
permalink: /labs/animation-tool/
---
## Constellation Animation Creation Interface
{::options html_to_native="true" /}
This is a simple user interface I developed to create "constellation animations" from animated GIFs. The animations are created in Javascript using the [GreenSock JavaScript Animation API](http://greensock.com/), and this tool will generate the code for you. Follow the steps to the left to try it yourself. <em>Note: Page scroll has been intentionally disabled.</em>

<center>

			<div id="contentContainer">
				<img class="grid" id="example1" src="/img/horse-still.jpg" rel:animated_src="/img/horse.gif" rel:auto_play="0" width="467" height="375" />
				<svg class="grid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="horse" viewBox="0 0 467 375"/>

			</div>

			<div id="controls"/>
				<button class="btn small" id="pause">Pause</button> |
				<button class="btn small" id="play">Play</button> |
				<button class="btn small" id="restart">Restart</button> |
				<button class="btn small" id="next">Step forward</button> |
				<button class="btn small" id="prev">Step back</button>
			</div>

			<br/>

			<!-- Steps -->
			<div class="steps" id="step-1">
				<h3>Step One</h3>
				<p>Click on the horse's "joints" in the image to add dots.</p><p><a href="" data-toggle="modal" data-target="#step1Modal"> See example.</a></p>
				<button class="btn small" id="animate">Next Step</button>
			</div>
			<div class="steps" id="step-2">
				<h3>Step Two</h3>
				<p>Now, you will animate the dots for each frame. Click "step forward" to advance the GIF to the next frame and drag all the dots to where the joints should be in this frame. Do this for each frame you want to animate.  When you are done, click "Show the Code".</p><p><a href="" data-toggle="modal" data-target="#step2Modal"> See example.</a></p>
				<button class="btn small" id="show" data-toggle="modal" data-target="#myModal">Show the Code</button>
			</div>

			<!-- Modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="myModalLabel">Copy & Paste into this <a href="http://codepen.io/sdellis/pen/PNMRxL">CodePen Template</a></h4>
			      </div>
			      <div class="modal-body">
						<div class="codepen">
							<h2>SVG/HTML</h2>
							<form><textarea id="code" cols="30" rows="5" style="resize: none; overflow-y: hidden; height: 85px;"></textarea></form>
						</div>

						<div class="codepen">
							<h2>Javascript</h2>
							<form><textarea id="timeline" cols="30" rows="5" style="resize: none; overflow-y: hidden; height: 85px;">var t1 = new TimelineMax(); t1</textarea></form>
						</div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

			      </div>
			    </div>
			  </div>
			</div>


			<!-- Step One Modal -->
			<div class="modal fade" id="step1Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="step1ModalLabel">Step One: Example</h4>
						</div>
						<div class="modal-body">
							<img src="/img/step-one.gif" />
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

						</div>
					</div>
				</div>
			</div>


			<!-- Step Two Modal -->
			<div class="modal fade" id="step2Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="step2ModallLabel">Step Two: Example</h4>
			      </div>
			      <div class="modal-body">
							<img src="/img/step-two.gif" />
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

			      </div>
			    </div>
			  </div>
			</div>


</center>

<script src="{{ "/js/supergif.js" | prepend: site.baseurl }}"></script>
<script src="{{ "/js/snap.svg-min.js" | prepend: site.baseurl }}"></script>
<script type="text/javascript">
  $(function() {
			var container = $( "#contentContainer" );
			var tl = $("#timeline");
			var box = $("#code");
			var offset = document.getElementById('contentContainer');
			var offsetX = offset.getBoundingClientRect().left;
			var offsetY = offset.getBoundingClientRect().top;
			var s = Snap("#horse");
			var i = 0;
			var c = [];

			var $body = $('body'),
    			scrollDisabled = false,
    			scrollTop;

			function disable() {
			  $( "#animate" ).css("background","lightgreen").text("Animating");
			}

			$( "#animate" ).click(function() {
				$( container ).off();
				$("#step-1").hide();
				$("#step-2").show();
			});

			scrollDisable();

			function scrollDisable() {
			    if (scrollDisabled) {
			        return;
			    }

			    scrollTop = $(window).scrollTop();

			    $body.addClass('scrolDisabled')
			        .css({
			        top: -1 * scrollTop
			    });

			    scrollDisabled = true;
			}

			$( "#show" ).click(function() {
				$( ".codepen" ).show();
				$( ".grid" ).hide();
			});

			$( container ).on( "click", function(event) {

				var xPosition = event.clientX - this.getBoundingClientRect().left;
				var yPosition = event.clientY - this.getBoundingClientRect().top;

				c[i] = s.circle(parseInt(xPosition),parseInt(yPosition),5);

				c[i].attr({
						id: "c"+i, class: "dots"
				});

				c[i].drag(move, start, stop );

				// WRITE OUT SVG FOR COPY PASTE //
				var txt = '<circle id="c' + i + '" class="dots" style="fill: #FADFAA;" cx="' + parseInt(xPosition) + '" cy="' + parseInt(yPosition) + '" r="2.2" />';
    		box.val(box.val() + txt);
				box.focus();

				i++;
			});

			var move = function(dx,dy) {

		    this.attr({
		      transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
		    });

			}

			var start = function() {
			  this.data('origTransform', this.transform().local );
			}

			var stop = function(event) {
				var xPosition = event.clientX - offsetX;
				var yPosition = event.clientY - offsetY;
				txt = '.to(' + event.target.id + ', 0.5, {attr:{cx:' + parseInt(xPosition) + ', cy:' + parseInt(yPosition) + '}}, "frame' + sup1.get_current_frame() + '")';
				v = 'var ' + event.target.id + ' = $("#' + event.target.id + '");'

				tl.val(v + tl.val() + txt);
				tl.focus();		        
			}

			//////////////////////
			// S U P E R G I F
			//////////////////////

			var sup1 = new SuperGif({ gif: document.getElementById('example1') } );
      sup1.load();

      $( "#pause" ).on( "click", function(e) {
        e.preventDefault();
        sup1.pause();
      });

      $( "#play" ).on( "click", function(e) {
        e.preventDefault();
        sup1.play();
      });

      $( "#restart" ).on( "click", function(e) {
        e.preventDefault();
        sup1.move_to(0);
      });

      $( "#next" ).on( "click", function(e) {
        e.preventDefault();
        sup1.move_relative(1);
      });

      $( "#prev" ).on( "click", function(e) {
        e.preventDefault();
        sup1.move_relative(-1);
      });


			$('#code').autogrow();
			$('#timeline').autogrow();

			function SVG(elementName) {
				return document.createElementNS('http://www.w3.org/2000/svg', elementName);
			}

    });

		(function($) {
		    $.fn.autogrow = function() {
		        return this.each(function() {
		            var textarea = this;
		            $.fn.autogrow.resize(textarea);
		            $(textarea).focus(function() {
		                textarea.interval = setInterval(function() {
		                    $.fn.autogrow.resize(textarea);
		                }, 500);
		            }).blur(function() {
		                clearInterval(textarea.interval);
		            });
		        });
		    };
		    $.fn.autogrow.resize = function(textarea) {
		        var lineHeight = parseInt($(textarea).css('line-height'), 10);
		        var lines = textarea.value.split('\n');
		        var columns = textarea.cols;
		        var lineCount = 0;
		        $.each(lines, function() {
		            lineCount += Math.ceil(this.length / columns) || 1;
		        });
		        var height = lineHeight * (lineCount + 1);
		        $(textarea).css('height', height);
		    };
		})(jQuery);



</script>
