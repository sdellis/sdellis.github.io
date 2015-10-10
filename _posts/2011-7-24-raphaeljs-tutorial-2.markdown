---
layout: post
title:  "RaphaelJS - How to Make a Google-like Motion Chart: Lesson Two"
date:   2011-07-24 14:29:20
categories: tech blogging
---

## Lesson Two: Charting a Spreadsheet

So, now that we can put a bubble wherever we want on our "canvas," the next step is to put bubbles where the data tells them they should go.  We are going to be modifying the existing HTML page we started in Lesson One.  Ready?

This is where it gets a little more complicated because we need a way of extracting the values from a CSV file into JavaScript.  CSV is often used to describe text files that have spreadsheet-like data delimited by any type of character (not necessarily a comma... in fact, I like to use pipes "|" as they are not common).  At first, I thought the only way to do this was to use a server-side scripting language like PHP (see this link for a good [demo/explanation](http://www.designdetector.com/archives/04/10/FlatFileDatabaseDemo.php#phpcode)), but after some reading, there is a simpler way!  You can use AJAX and a [jQuery plugin](http://plugins.jquery.com/project/csv) that can turn your CSV file into a javascript array that yo can do stuff with.

### Step One:  Add the CSV jQuery plugin to your HTML

Download the following into your "working folder," where your HTML resides:  [http://js-tables.googlecode.com/svn/trunk/jquery.csv.js](http://js-tables.googlecode.com/svn/trunk/jquery.csv.js)

Then it's as simple as adding another "include" that points to that plugin code:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bubble Chart</title>
<script src="raphael-min.js"></script>
<script src="jquery.js"></script>
<script src="jquery.csv.js"></script>
{% endhighlight %}

### Step Two: Create or Download a CSV file

If you don't currently have a CSV file, you should create one now in your working folder.  Ultimately, this will be exported from a spreadsheet program, such as Excel.  If you want to skip that step, or see an example, I posted one here that you can download for our purposes:[http://hit-worthy.com/bubbles/data.txt](http://hit-worthy.com/bubbles/data.txt) .  To reiterate, we want five data points:  Vertical (Y), Horizontal (X), Bubble Size, and Bubble Color, Time Unit.  You will need to determine what you want to correlate but in my example, I was thinking: User Activity, Sales (or other quantifiable goal), Group Size, Department (pre-normalized to a color in Excel), and Days.

### Step Three: Use AJAX to get your data into JavaScript

Next, we will use the [jQuery.get function](http://api.jquery.com/jQuery.get) (see the red code below) which makes it easy to use AJAX to load in external data or files like the one we just created.  The "get" function has twoparameters, the URL/filename of the data, and then a "callback" function that does something (with our without the data) when it's loaded.  We can simply make the callback function a "wrapper" to our Raphael bubble chart code.  But before we get fancy, let's just make sure the data is getting loaded by using an alert message to give us some feedback:
{% highlight javascript %}
$(function () {

	$.get('data.txt', function(data) { // load our csv file and double check

  		array = $.csv("|")(data);

  		alert('Double checking first element of first array: ' + array[0][0]);

	});
{% endhighlight %}
### Step Four:  Paint the Bubble Outlines

You should get an alert that says the first element of the first array is "10".  That tells us the array is loaded and accessible.  (If you want to see what the CSV file "looks like" as an array, you can go to the "Array Contents" at the bottom of this email.)

Next we will create our canvas before we get the data so we have something to paint on -- just simply move it up above the *$.get* block.  Then we will comment out our alert and create a *[for* ](http://www.w3schools.com/js/js_loop_for.asp)[loop](http://www.w3schools.com/js/js_loop_for.asp) to iterate over each line in the spreadsheet (now stored as array elements):  
{% highlight javascript %}
$(function () {

	// Creates canvas 420 × 300 and positioned via the #canvas stylesheet rules

	var paper = Raphael("canvas", 420, 300);

	$.get('data.txt', function(data) { // load our csv file

  	    array = $.csv("|")(data);

	    var arLen=array.length;

	    for ( var i=0, len=arLen; i<len; ++i ){

  		var bubble = paper.circle(array[i][0], 300 - array[i][1], array[i][2]);

                bubble.attr("fill", array[i][3]);

                bubble.attr("fill-opacity",0.3);

                bubble.attr("stroke", "white");

	    }                

  	    // alert('First element of first array: ' + array[0][0]);

	});
{% endhighlight %}

I should point out a few things.  First, in *array[i][0]* the "i" represents each line that it's looping over while the second bracket contains the column number.  Also notice that I gave them some transparency so you could see other bubbles that might be obscured.  Finally, I am subtracting the Y coordinate from the height of the canvas (300) when creating each bubble.  That's because the Y coordinate of zero on Raphael's canvas starts at the top left, not the bottom left, as we would expect in a graph.  We will eventually set this to a variable, so the canvas can be any height without affecting the Y value.

### Step Five:  Test It Out!

Now look at your page in a web browser.  You should see some pretty layers of bubbles as a real "scatterplot" graph.  We will tackle drawing the axes and labels, as well as the animation in the next lesson or two.

------------Example of What the Array "Looks Like"--------------

	*** Array Contents**

	    '0' ...

	        '0' => "10"

	        '1' => "20"

	        '2' => "10"

	        '3' => "sales"

	        '4' => "1"

	    '1' ...

	        '0' => "15"

	        '1' => "30"

	        '2' => "20"

	        '3' => "innovation"

	        '4' => "1"

	    '2' ...

	        '0' => "5"

	        '1' => "100"

	        '2' => "30"

	        '3' => "legal"

	        '4' => "1"

	    '3' ...

	        '0' => "70"

	        '1' => "100"

	        '2' => "40"

	        '3' => "hr"

	        '4' => "1"

	    '4' ...

	        '0' => "85"

	        '1' => "50"

	        '2' => "50"

	        '3' => "innovation"

	        '4' => "1"
