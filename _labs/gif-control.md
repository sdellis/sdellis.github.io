---
layout: labs-default
title: GIF Control
permalink: /labs/gif-control/
---
## GIF Control
Wouldn't it be cool to be able to control a GIF like a video? I think so. Testing out the [libgif-js](https://github.com/buzzfeed/libgif-js) library here with nice results.

{::options html_to_native="true" /}

<center>
			<div id="contentContainer" style="cursor: pointer;position:relative;overflow:hidden;width:467px;height:375px">
				<img id="example1" src="/img/horse-still.jpg" rel:animated_src="/img/horse.gif" rel:auto_play="0" width="467" height="375" />
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="horse" viewBox="0 0 467 375"/>

			</div>
			<br>

			<button id="pause">Pause</button> |
			<button id="play">Play</button> |
			<button id="restart">Restart</button> |
			<button id="next">Step forward</button> |
			<button id="prev">Step back</button>
			<hr/>
			<form><textarea id="code" cols="30" rows="5" style="resize: none; overflow-y: hidden; height: 85px;"></textarea></form>
</center>

<script src="{{ "/js/supergif.js" | prepend: site.baseurl }}"></script>

<script type="text/javascript">
  $(function() {
			function SVG(elementName) {
				return document.createElementNS('http://www.w3.org/2000/svg', elementName);
			}

			//var s = Snap("#horse");
			//circle.drag(move, start, stop );

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

			var container = $( "#contentContainer" );

			$( container ).on( "click", function(event) {

				var xPosition = event.clientX - this.getBoundingClientRect().left;
				var yPosition = event.clientY - this.getBoundingClientRect().top;

			  //console.log(parseInt(xPosition) + "px x " + parseInt(yPosition) + "px");
				console.log('<circle id="left-pupil" cx="' + parseInt(xPosition) + '" cy="' + parseInt(yPosition) + '" r="2.2" />');

				var txt = '<circle id="" class="dots" style="fill: #FADFAA;" cx="' + parseInt(xPosition) + '" cy="' + parseInt(yPosition) + '" r="2.2" />';

				var circle = SVG('circle');
 				$(circle).attr( { class: "dots", cx: parseInt(xPosition),
                 cy: parseInt(yPosition),
                 r: 2.2 } );

				// $( "#horse" ).append( txt );
				$( "#horse" ).append(circle);
				var box = $("#code");
    		box.val(box.val() + txt);

      });


    });

</script>
