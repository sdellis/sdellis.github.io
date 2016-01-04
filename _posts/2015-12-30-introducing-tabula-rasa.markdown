---
layout: post
title:  "Introducing Tabula Rasa"
date:   2015-12-30 14:29:20
categories: tech blogging javascript iiif
summary: "Tabula Rasa is a Node.js SDK (aka, 'starter kit') for working with IIIF Presentation API resources. It was originally developed as a base library for Tabula, which can be used to create all sorts of useful native web apps that work with IIIF APIs. However, it can just as easily be used on the server to create and edit IIIF Presentation API resources."
---
[Tabula Rasa](https://github.com/sdellis/tabula-rasa) is a node.js "base library" for working with [IIIF Presentation API](http://iiif.io/api/presentation/2.0/) resources (i.e., collections, manifests, canvases, etc.). It was originally developed for [Tabula](https://github.com/sdellis/tabula), a "starter kit" for building all sorts of useful native web apps that work with IIIF APIs. However, it can just as easily be used on the server to create and edit IIIF Presentation API resources.

Tabula Rasa uses [Ampersand.js](https://ampersandjs.com/) models and collections to make writing client side IIIF applications as simple as possible.  Ampersand is based heavily on Backbone.js, and anyone familiar with Ruby on Rails (or any other MVC framework) will also be very comfortable using it.  It is a npm module (node for "ruby gem"), making it super easy to bundle into browser-based apps built with Webpack.  It is also future-ready since it's written in ES2015, and has ever-growing test coverage.

{::options html_to_native="true" /}

## Show, Dont' Tell.
Tabula got its name because it is intended to emphasize evidence in slideshow presentations.  The name _tabula_ (latin for slate or tablet) was selected as a "namespace" for a suite of similar applications because it is a tablet with many possibilities.  The notion of _tabula rasa_ ("clean state" or "blank tablet") connotes a view of mind as originally blank, on which experience leaves marks.  This notion is the basis of Empiricism and ultimately, the scientific method.

!["Aphorism I."" From Bacon's Novum organum (1620).](/img/bacon-aphorism.jpg)
<span class="caption">"Man, being the servant and interpreter of Nature, can do and understand so much and so much only as he has observed in fact or in thought about the order of Nature: beyond this he neither knows anything nor can do anything."- Sir Francis Bacon, "Aphorism I." From Novum organum (1620).</span>

If Empiricism is true, then it must be possible to learn anything. As an artist who learned to draw from [a book](http://www.amazon.com/Drawing-Right-Side-Brain-Definitive/dp/1585429201), and has read about [10,000 hours of practice](https://en.wikipedia.org/wiki/Outliers_(book)), I believe it is possible to learn anything regardless of perceived talent. However, finding a good mentor is crucial to growth, and instructional tools, style, and techniques can make a huge difference in cognition and confidence in a field of study.  


## Cognitive Style in Software
In 2006, Edward Tufte published a [polemic on PowerPoint](http://www.edwardtufte.com/tufte/books_pp), lamenting the fact that the medium had a tendency to hide evidence rather than emphasize it. Tufte argues that PowerPoint imposes a style that reduces the intellectual level of the content passing through the program.  He lists several problems that occur with the default PP presentation format: _foreshortening of evidence and thought, low spatial resolution, a hierarchical single-path structure of organization, breaking up of narratives and data into minimal fragments, branding of slides with logos, and a smirky commercialism that turns information into a sales pitch and presenters into marketeers,_ to name a few of his criticisms.

![War is Peace, Freedom is Slavery, Ignorance is Strength](/img/war-is-peace.jpg)
<span class="caption">"The cognitive style of PowerPoint is familiar to readers of Orwell's remarkable and prescient novel 1984" - Edward Tufte</span>

Tufte offers a handful of suggestions for an improved technical reporting tool of the future, such as _a variety of page and screen layout templates, publication quality visualizations and data tables, scientific notation and typography, annotated measurement scales in images, open-document non-proprietary formats, and high resolution printing_.  

 Tabula is my attempt to address these suggestions, although Tufte makes a tall order and I am starting with baby steps.  Tabula wasn't supposed to simply be a starter kit.  In fact, when it is fully compliant with the IIIF specs, I intend to "freeze" it (perhaps with a new name) and move onto my original idea, which is a IIIF-based slideshow application. The first iteration of this slideshow application is meant to emphasize evidence through **four different approaches**, listed below with possibly more to come.

### 1. Revelation
Most people are familiar with the "Ken Burns effect", the slow image zooming and panning technique that was popularized in the Civil War documentaries. Variations of this technique not only create movement that can hold an audiences' attention, but they can be used to reveal certain information within a scene, sometimes revealing the bigger picture, and sometimes revealing greater detail.  We can also think of a faster version of this technique as another approach to revelation, serving as a "tour" around details of an image that help us connect the dots of what we are looking at.  Finally, a simple "controlled scroll" could be used to provide a non-slippy interface to a resource that must be larger than the viewport to read comfortably.

### 2. Comparison
There are two approaches to comparison of images.  The first is to situate two or more images side by side, making it easy to compare and contrast characteristics. The other is to provide an overlay of images that can be set to have different transparency values. Of course, there's no reason that the Revelation techniques described above couldn't be applied to Comparison-based slide templates.

### 3. Data and Visualization
One of the problems with PowerPoint that Tufte points out is the fact that the resolution is too low to reveal any meaningful data, and authors must resort to simple bullet points to get their point across. The ability to add dynamic, interactive visualizations to slides, or to zoom in on high resolution static visualizations is key to emphasizing data and evidence in an argument.

### 4. Dialogue
Finally, the ability to have a discussion through annotations (synchronously or asyncronously) is as important as the ability to observe when it comes to understanding. The ability to filter comments and questions based on reputation, institution, or other criteria can help determine the authority of a commentator. And because citations are "free" and automatic with IIIF resources, we can always gauge the authenticity of the resource and how credible it may be. All slides enable annotations in the form of text, audio, video, and drawing directly on the canvas.

Making Tabula compliant with IIIF APIs is a huge part of making this a reality.  While the above techniques would be possible without IIIF, and modern slideshow apps like Reveal.js offer more features than PowerPoint, easy access to good content cannot be understated, and that is the promise of IIIF.  The ability to create presentations from interoperable content held at renowned institutions of learning makes it easy for instructors to incorporate centuries of rich cultural and scientific history into their lessons and presentations. (In case there is any question, I should mention that instructors can always add their own non-IIIF content as well.)

## Inventing the Universe
Coming full circle, before I could move forward with Tabula, I had to create a base library that would let me (and others) create IIIF collections, manifests, canvases and such on the client simply by a single line in my package.json file.  To be clear, I don't claim to be inventing the universe on my own here.  There are lots of smart people creating pieces of the puzzle.  For example, [Manifesto](http://blog.edsilv.com/manifesto/) is a great client-side library that is also available as a npm module, but it does not yet allow you to create, only read manifests. [Other](https://github.com/IIIF/iiif-prezi/) [libraries](https://github.com/IIIF/osullivan/) are server-side only.  If I was going to allow people to create slideshows that are IIIF compliant, then I needed to offer a way to do it.  I am happy to introduce Tabula Rasa, a base library for building IIIF-compliant Native Web Apps (aka, single page web apps).

![Carl Sagan's Apple Pie Recipe](/img/carl-sagan.jpg)
<span class="caption">"If you want to make an apple pie, you must first invent the universe." - Carl Sagan</span>

I was heavily influenced by [Henrik Joreteg's](https://joreteg.com/) book [Human JavasScript](http://humanjavascript.com/) when creating Tabula and Tabula Rasa.  Empiricists like me believe that everyone can learn to code, and if you're just learning to write JavaScript, I cannot recommend this book enough.  Read more about Tabula Rasa on the [GitHub page](https://github.com/sdellis/tabula-rasa), test it out, and let me know what you think. The future is a blank slate!
