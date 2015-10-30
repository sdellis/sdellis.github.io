---
layout: experiment
title: Named-Entity-Checker
permalink: /labs/named-entities/
---
## Named Entity Checker
This week, I stumbled upon the [New York Times Labs Editor experiment](http://nytlabs.com/projects/editor.html) and have become inspired by the possibilities it presents in the realm of Libraries, Archives, and the Digital Humanities domain.  I had just finished up a small project where [students transcribe accounts of explorers and settlers of the American West](http://transcribe.princeton.edu/), which required some interface design for "crowd-sourced" transcription. I am also aware of the challenges of text-based encoding for which tagging or marking up text by hand can be prohibitively expensive.

So, why not follow the Times lead and apply the innovations they are working on for their journalists to the interfaces that we develop for crowdsourcing transcription?  Interface theorist and iconoclast, Bret Victor, [talks about the benefits of creating smaller feedback loops in the creation process](https://vimeo.com/36579366), and this is an example of that principle in transcription interfaces.  I put together a simple experiment to test out [nlp.js](https://github.com/spencermountain/nlp_compromise), a Natural Language Processing library written in JavaScript.

{::options html_to_native="true" /}

<hr/>
<div class="container" style="margin-top:20px; max-width:600px;">
  <div id="entities">
    <h3>This interface will identify "named entities" as you type.</h3>
    <textarea class="input" style="width:100%; height:150px">Oh I am so sad! The thought that I must leave my dear friends in Delton makes me almost sick--My brain seems oppressed and my heart sick. Mrs. Barlow and Henry are all very dear to me.
    </textarea>
    <div class="result" style="font-size:10px;"></div>
  </div>
</div>

<script>

$("#entities").find("textarea").keyup(function(){
  var txt=$(this).val() || ''
  var data= nlp.spot(txt)
  console.log(data)
  var html= data.map(function(p){
    return "<div style='background:yellowgreen; font-size:30px; display:inline-block; color:white; margin:5px; padding:8px;'>"+p.normalised+"</div>"
  }).join(" ")
  $(this).siblings(".result").html(html)
})

</script>
<script src="{{ "/js/nlp.js" | prepend: site.baseurl }}">
