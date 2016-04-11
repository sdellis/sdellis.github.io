---
layout: labs-default
title: GIF Control
permalink: /labs/gif-control/
---
## GIF Control
Wouldn't it be cool to be able to control a GIF like a video? I think so. Testing out the [libgif-js](https://github.com/buzzfeed/libgif-js) library here with nice results.

{::options html_to_native="true" /}

<center>

			<img id="example1" src="/img/horse-still.jpg" rel:animated_src="/img/horse.gif" rel:auto_play="0" width="467" height="375" />
			<br>

			<button id="pause">Pause</button> |
			<button id="play">Play</button> |
			<button id="restart">Restart</button> |
			<button id="next">Step forward</button> |
			<button id="prev">Step back</button>

</center>

<script src="{{ "/js/supergif.js" | prepend: site.baseurl }}"></script>
<script type="text/javascript">
  $(function() {
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

    });
</script>
