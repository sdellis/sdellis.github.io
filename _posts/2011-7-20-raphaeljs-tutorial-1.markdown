---
layout: post
title:  "RaphaelJS - How to Make a Google-like Motion Chart: Lesson One"
date:   2011-07-20 14:29:20
categories: tech blogging
---

## Lesson One:  Drawing a Circle

The dirty little secret about JavaScript is that you don't actually have to do the "dirty" work anymore.  Code libraries abstract out the ugly stuff and leave you with a nice palette of functions (sometimes called "methods") to use.  Functions essentially hide complex code and allow you to get the desired result with a single line and a few parameters (sometimes called "arguments").  You still do need to know a little bit about how JavaScript works, but not much as you think, and I will cover that as we go along.  Every library should have [documentation](http://raphaeljs.com/reference.html), which includes a list of the functions.

### Step 1: Make Some HTML5

In order to start using a code library, we need to include it in our HTML and since Raphael uses HTML5's vector graphic capabilities, we need to use HTML5.  So, the first step is to create an HTML5 document.  This will rarely change and it's super easy:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bubble Chart</title>
{% endhighlight %}

### Step 2: Include the Raphael and jQuery Libraries

Now we need to include the code libraries that make it easy to draw shapes without the math.  The Raphael library is itself dependent on the jQuery library, so we need to include both of them.  So go [here](https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js) and save all that gobbledygook in the same folder as your HTML file (raphael-min.js works for a filename).  Then go [here](http://raphaeljs.com/jquery.js), and save that as jquery.js in the same folder as well.  Don't worry if you don't understand that stuff.  The point is you don't need to!  Now, we will include them in the HTML by inserting the red code after the <title> tag like so:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bubble Chart</title>
<script src="raphael-min.js"></script>
<script src="jquery.js"></script>
{% endhighlight %}

### Step 3: Create a Canvas

Next we need to create an area where we can draw.  This is a simple <div> tag with an "id" attribute.  While we're at it, we should add some CSS so that we can actually see the canvas against the white background.  We'll put a light grey gesso on it ;-).  Voila, your first HTML5 page!

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bubble Chart</title>
<script src="raphael-min.js"></script>
<script src="jquery.js"></script>
<style type="text/css" media="screen">
    #canvas {
	      background-color:#ccc;
        color: #333;
	      border:#000 dotted;
        left: 50%;
        margin: -150px 0 0 -400px;
        position: absolute;
        top: 50%;
        width: 300px;
        width: 800px;
    }
</style>
</head>
<body>
<div id="canvas"></div>
</body>
</html>
{% endhighlight %}

### Step 4: Draw a Circle

Now that we have a canvas, let's place a single bubble on it using Raphael's "circle" function.  But first, there's one little trick you need to know about jQuery: everything must go inside a<script>$(function () { code here... }</script> wrapper for it to work.  The purpose of this wrapper is to ensure that the page is fully loaded before any code is executed (there are reasons for this, but they're not important right now).  You can think of it as just an elaborately complex "tag" container for all your JavaScript code.  The green code is straight from the Raphael reference page.  It seems redundant to have to create a variable named "paper" when you already have a "canvas", but you basically need to do this to "bind" the div as Raphael's drawing area.  This code is your final HTML5 page with your circle on it:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Bubble Chart</title>
  <script src="raphael-min.js"></script>
  <script src="jquery.js"></script>
  <script>

  $(function () {

      // Creates canvas 420 × 300 and positioned via the #canvas stylesheet rules
  	  var paper = Raphael("canvas", 420, 300);

  	   // Creates circle at x = 50, y = 40, with radius 10 using the "circle" function
      var bubble = paper.circle(50, 40, 10);

  	   // Sets the fill attribute of the circle to red (#f00)using the "attr" (attribute) function
       bubble.attr("fill", "#f00");

       // Sets the stroke attribute of the circle to white
       bubble.attr("stroke", "#fff");
  });

  </script>
  <style type="text/css" media="screen">

      #canvas {
  	      background-color:#ccc;
          color: #333;
  	      border:#000 dotted;
          left: 50%;
          margin: -150px 0 0 -400px;
          position: absolute;
          top: 50%;
          width: 300px;
          width: 800px;
      }
  </style>
</head>
<body>
<div id="canvas"></div>
</body>
</html>
{% endhighlight %}

**Further reading:** [How jQuery Works](http://docs.jquery.com/Tutorials:How_jQuery_Works#jQuery:_The_Basics)
