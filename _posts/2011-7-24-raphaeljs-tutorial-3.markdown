---
layout: post
title:  "RaphaelJS - How to Make a Google-like Motion Chart: Lesson Three"
date:   2011-07-27 14:29:20
categories: tech blogging
---

## Lesson Three: Animating the Bubbles

### Step One: Group the Bubble Data by Time

So, if you haven't guessed a lot of programming involves manipulating data and rearranging it into different forms that will make it more accessible and easy to loop through.  Arrays are one of the best ways to do this, and I rely on them heavily.  Arrays are essentially a list (or stack) of key:value pairs.  This makes them two-dimensional and you can put any type of value in... numbers, objects, arrays, booleans, etch.  They kind of look like this:

  '0' => 10

  '1' => object

  '2' => array

  '3' => "string"

  '4' => true

So, how does this help us?  It's inconvenient to have the unit of time stuck in the last array element of the row, and duplicated at that!  What would make our lives easier is to make the key in our array into a unit of time so that we can loop over each day (or what have you... easier than saying "time interval") and visualize the changes from day to day.  We have several data points that we need to store in each day -- basically our x and y coordinates, as well as the size of our bubbles.  So, how do we store all these values in a two dimensional data structure?

Thankfully there are "multi-dimensional arrays," which allow us to do this.  Multi-dimensional arrays, are basically arrays inside of arrays.  In fact, we have already done this -- remember what the data from our spreadsheet looked like when we put it into an array?  Each row became a key, and the values became an array stack.  Now what we want to do is group all "row arrays" with the same day value into another array and set that day as the key.  

To save space, and keep it simple, let's say we have only two days worth of data for a single bubble -- in other words, two rows.  So, we are going to write some code that will take the day value from the 5th column (#4 below) and make that the key for the time grouping.  This is how we want our "day-grouped array" to look:

      '1' ...

          '0' ...

              '0' => "10"

              '1' => "20"

              '2' => "10"

              '3' => "green"

              '4' => "1"

      '2' ...

          '0' ...

              '0' => "15"

              '1' => "30"

              '2' => "20"

              '3' => "green"

              '4' => "2"

So, this is what our code will look like (new code in red):

{% highlight javascript %}
$.get('data.txt', function(data) {

  array = $.csv("|")(data);

  var arLen=array.length;

  var time_intervals=new Array(); // to store labels for (day, week, month)

  var timeGroups=new Array(); // this is the "day-grouped array" example above



  for ( var i=0, len=arLen; i<len; ++i ){

    if ($.inArray(array[i][4], time_intervals) == -1) {

	time_intervals.push(array[i][4]);

	timeGroups[array[i][4]] = new Array();

    }

    timeGroups[array[i][4]].push(array[i]);

  }

}
{% endhighlight %}

Do you see what's going on here?  I know, it's a little hairy.  Let's take it line by line:

1. We create an array to store the time labels.  We will need to store the labels to mark up our chart.  Even though I only used numbers, you could definitely put "2 weeks" or "10 days" as a value for your units of time.  By the way, in JavaScript there are [a few ways to create an array](http://www.w3schools.com/js/js_obj_array.asp).  If we don't know what our values are going to be up front, we just create a new array and populate it later.

2. We create our "day-grouped array," again, to be populated later.

3. We start looping through the rows from our spreadsheet (as represented by the array named "array" - remember that one?).

4. Since the spreadsheet contains duplicated labels for time, we use a jQuery function called "[inArray](http://api.jquery.com/jQuery.inArray/)" to determine if each time interval is already represented in the time_intervals array (we only want one).  If not, then [push](http://www.w3schools.com/jsref/jsref_push.asp) the label into time_intervals, and create a new array for that label in timeGroups.

5. Finally, push the entire row for that time group into the key representing that label.

### Step Two: Create a Bubble "Roster" and Repaint Them With Data from the first timeGroup Element

In the last lesson, we looped over each array element and painted bubbles on the canvas.  However, during that loop, we reused (and overwrote) the same "bubble" variable.  Therefore we have no way to refer to each bubble we painted on the canvas "by name," which is problematic if we want to give it some directions!  We are going to revisit our trusty friend, the array, so we will be able to refer to them.  However, since we don't know how many bubbles we will actually have (that's determined by the data), we will just assign them an incremental number (aka, key) and save them as values in an array called "bubbleNames".

So, because the bubbles we created in the previous lesson don't have "names", we will need to get rid of that code, and  repaint them using the first element of the timeGroups array, which holds the starting data for each of the bubbles.  This code would go right after the previous "for" block, but within the last function brace.

{% highlight javascript %}
    timeGroups[array[i][4]].push(array[i]);

  }

  var bubbleNames = new Array();

  var bubLen=timeGroups[time_intervals[0]].length;

  for ( var i=0, len=bubLen; i<len; ++i ){

    bubbleNames[i] = paper.circle(timeGroups[time_intervals[0]][i][0], 300 - timeGroups[time_intervals[0]][i][1], timeGroups[time_intervals[0]][i][2]);

    bubbleNames[i].attr("fill", timeGroups[time_intervals[0]][i][3]);

    bubbleNames[i].attr("fill-opacity",0.3);

    bubbleNames[i].attr("stroke", "#fff");

  }

}
{% endhighlight %}

Let's step through this code line by line as well.  

1. Here is where we create an array that essentially names our bubbles.  We can store any type of variable in an array value, including strings, other arrays, and "objects".  Our bubbles are objects.

2. On the second red line, we are getting the length of the array (bubLen) that is stored in the first timeGroups element so we know how many bubbles to name.  Notice that the element "keys" for the timeGroups array are the labels we used for time_intervals (not the typical incremented numerical values starting at zero).  So, we use the value of the first time_intervals element as the key for getting the first timeGroups element.  

3. Since we will be painting the first bubbles from the first timeGroups element, we need to use time_intervals[0] again to get the data for each bubble (represented by "i").

## Step Three: Animate the Bubbles

So, this *should* have been a lot easier than it was.  I don't know if there's a bug in the Raphael code, or if I'm doing something wrong, but the following *should* have worked:

{% highlight javascript %}
var timeLen=time_intervals.length;

for ( var i=1, len=timeLen; i<len; ++i ){

    var timeUnitLen=timeGroups[time_intervals[i]].length;

    for ( var j=0, len=bubUnitLen; j<len; ++j ){

       bubbleNames[j].animate({

         cx:timeGroups[time_intervals[i]][j][0],

         cy:300 - timeGroups[time_intervals[i]][j][1],

         r: timeGroups[time_intervals[i]][j][2]

       }, 2000);

    }

}
{% endhighlight %}

The above code, may not be perfect because I wasn't able to test it properly.  It was animating, but the bubbles were not changing course if the data/numbers started declining instead of incrementing -- it seemed to "tween" from the beginning value to the last value without paying attention to anything in betwee.  

Anyway, there's usually a dozen ways to get to the same result when programming (I think I tried them all before I got to this).  When this approach didn't work, I looked at the ["keyframes"](http://raphaeljs.com/reference.html#animate)option for animating the bubbles.  This is tough to do dynamically because you need to know what percentages of the overall animation time should be taken between each "keyframe".  It would be easy if I could set variables for the percentages, but that wasn't working.  Luckily there is a powerful, if frowned upon, function in JavaScript, called *eval()*, for dynamically creating a string and executing it as code.   So that's what I did here (immediately following the last code block), and although it's ugly... it worked!

{% highlight javascript %}
var bLen=timeGroups.length;

var timeLen=time_intervals.length;



var keyframeSplit = Math.ceil(100/(timeLen - 1));

var colOrder=["cx","cy","r"]; // this is the order of the column values in our spreadsheet

var totalBubbles=bubbleNames.length;

for ( var j=0, len=totalBubbles; j<=len; ++j ){ // for each bubble we created...

    var str =  'bubbleNames['+j+'].stop()';

    for ( var colnum=0; colnum <3; ++colnum ){ // each column animates with a set of keyframes

        var frame = 0;

        str += '.animate({';

        for ( var i=1, len=bLen-1; i<len; ++i ){ // create keyframes

            frame = frame + keyframeSplit;

            str += '"'+frame+'%": {'+colOrder[colnum]+':';

	    if(colOrder[colnum]=="cy"){ str += '300 -';} // remember, we need to subtract the canvas height from y

	    str += 'timeGroups['+time_intervals[i]+']['+j+']['+colnum+']},';

	}

	str += '}, 5000)';

    }

    str += ';';

    console.log(str);

    eval(str);

}
{% endhighlight %}


So, I will deconstruct the above code if you need me to, but essentially, I am creating a codeblock that looks like this, putting it into a string variable called "str", and using the eval() function to execute it for each bubble:

{% highlight javascript %}
bubbleNames[0].stop().animate({

    "34%": {cx:timeGroups[2][0][0]},

    "68%": {cx:timeGroups[3][0][0]},

    "102%": {cx:timeGroups[4][0][0]},

}, 5000).animate({

    "34%": {cy:300 -timeGroups[2][0][1]},

    "68%": {cy:300 -timeGroups[3][0][1]},

    "102%": {cy:300 -timeGroups[4][0][1]},

}, 5000).animate({

    "34%": {r:timeGroups[2][0][2]},

    "68%": {r:timeGroups[3][0][2]},

    "102%": {r:timeGroups[4][0][2]},

}, 5000);
{% endhighlight %}


You will notice that the x, y, and radius animations are happening in the span of 5 seconds (5000 miliseconds).  You will also notice that my math for percentages is not perfect... I rounded any decimals up, and could have added an extra step here to keep it to 100%, but it didn't seem to matter that it was over, so whatever.  

So, this is no doubt a bit confusing!  Looping through arrays can be a mind bender, so if you do a "view source" on the following example, there is a function called "dump()" that spits them out on the page in a more visual way.  Anyway, you can see the full, working code here (and view source it):

[http://hit-worthy.com/bubbles/](http://hit-worthy.com/bubbles/)

Next lesson will be the finishing touches: the axes, labels, and scaling to fit the screen.
