---
layout: post
title:  "Personal User Interfaces"
date:   2016-04-14 14:29:20
categories: tech blogging design
summary: "Many years ago, I remember learning about how little data the human mind needs before it starts to fill in the blanks to interpret what it's seeing. I was introduced to the biological motion demos created by George Mather in an Information Visualization class way back in 2010.  Unfortunately, I could not locate the original, so I decided to use SVG, JavaScript, and a custom personal interface to recreate the effect. This post documents my journey."
---

Many years ago, I remember learning about how little data the human mind needs before it starts to fill in the blanks to interpret what it's seeing. I was introduced to the biological motion demos created by George Mather in an Information Visualization class way back in 2010.  I was disappointed to discover the site that hosts them is no longer available. You can at least [read about the original example](https://web.archive.org/web/20071212222117/http://www.lifesci.sussex.ac.uk/home/George_Mather/Motion/BM.HTML), and through the process I describe in this post (spoiler alert!), I have [recreated the effect at CodePen](http://codepen.io/sdellis/pen/xVYMJj) as a "constellation animation".

<p data-height="266" data-theme-id="dark" data-slug-hash="xVYMJj" data-default-tab="js,result" data-user="sdellis" data-embed-version="2" data-preview="false" class="codepen">See the Pen <a href="http://codepen.io/sdellis/pen/xVYMJj/">SVG Running Horse Constellation Animation</a> by Shaun Ellis (<a href="http://codepen.io/sdellis">@sdellis</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<hr style="margin: 25px 0px 25px 0px;"/>

## The Evolution of Web Animation
Animation is a powerful 4th-dimension communication tool that can tell a story, convey meaning, signal transitions, draw attention, and show changes to data over time. Animation on the internet is almost as old as the internet itself, although it's had a dip in popularity with only a recent resurgence as the interest in Interaction Design has grown.

Many of us have been doing this long enough to remember the excesses of Macromedia's (and then Adobe's) Flash technology. Flash provided simple visual tools for designers to create motion graphics in websites. Animation as a design element was often abused via infamous "splash" pages, blinking icons, and overzealous button states.  More often than not, such gratuitous "bling" got in the way of the users and only worsened Flash's bad reputation, which along with several other shortcomings -- and [one famous snub](http://www.apple.com/hotnews/thoughts-on-flash/) -- led to Flash's ultimate demise.

In the years since there has been a renaissance of open web technologies. I have been eager to test the limits of HTML5 Canvas, CSS, and SVG animations and figured that recreating one of George Mather's simple animations would be relatively easy to start with. I thought back to the animated dots and how it was essentially a moving constellation.  Then I thought it would be fun to bring the night sky to life by animating custom constellations.

As I began my research, I stumbled across this animation of a "polylion" (below) and had no idea that the state of JavaScript animation was so sophisticated.  This work used GreenSock's TweenMax animation library, and I noticed a few other impressive animations that used this library as well and started to play.  I soon realized that the API was conceptually similar to how one might construct animations on Timelines in Flash, but without the interface that came bundled with Flash.

<p data-height="266" data-theme-id="dark" data-slug-hash="RNLgJP" data-default-tab="html,result" data-user="grayghostvisuals" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/grayghostvisuals/pen/RNLgJP/">SVG Low PolyLion: Animated Polygons</a> by GRAY GHOST (<a href="http://codepen.io/grayghostvisuals">@grayghostvisuals</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<hr style="margin: 25px 0px 25px 0px;"/>

## Personal User Interfaces
In order to animate my dots, I would need to plot their coordinate values on a X/Y axis, and then plug these into my code.  An animation like I was planning would be impossible to create without a graphical interface and some instant feedback mechanism. Furthermore, in order to get the nuances that I saw in the original animation, I would have to trace the movement of each joint in each frame on top of a moving being!

I decided that I needed to build an interface that would let me visually plot and animate the dots on top of each frame of an animation. It would need to also allow me to move the dots visually, and would then write the code for me.

Luckily, I discovered libgif-js and was able to control a GIF animation with "video-like" controls. This worked well as I could step through each frame, but I needed to overlay an SVG canvas that would let me add dots by clicking on the image. I tried to use standard HTML5 and jQuery for this, but working with SVG is a little different from working with standard DOM elements. I had to do some backflips to be able to add SVG dots to the canvas. I also had trouble with HTML5 standard "draggable" commands.  Now that I have discovered GreenSock's TweenMax has "Draggable" utility, I probably will try using that, but for the initial draft, I used [Snap](http://snapsvg.io/).

The result is [a first pass at a simple user interface to generate my animations](/labs/animation-tool). There are a number of bugs that I need to address, but if you don't scroll or resize while you are plotting the dots you can quickly make an animation as demonstrated in [this short video](http://quick.as/egr7cbvkx).

Of course, you need to do this for every frame in the sequence, but once you are done, you can click the "Show the Code" button, copy and paste into the appropriate places in [this Codepen template](http://codepen.io/sdellis/pen/EKLqrx) and voilà! A constellation animation!

![Animation Interface](/img/animation-interface.jpg)
<span class="caption">Screen shot of the simple interface tool.</span>

## Next Steps
There are so many ways it can go, but my immediate next steps include refining the interface, adding better styles, and squashing some of the scrolling/resize bugs.  I would also like it to generate the final animation preview right in the interface/app, without having to rely on CodePen.  Adding onion-skinning (increased dot opacity on either side of the current frame) would make it much easier to trace the joints. Obviously, it would be great if people could upload their own GIFs as it doesn't work cross-domain for security purposes.  Finally, it would be great to extend this beyond dots and allow animators to create layers of polygons and other shapes for expanded design element options.

The ability to create personal interfaces that simplify your tasks (or even make them possible) is incredibly empowering.  You also don't always need to make a polished product if it meets your goals and you know how to use it.  Most of us UI developers are so busy developing awesome front ends for others that we forget we can create interfaces for ourselves to get the output we want from the computer.

----
