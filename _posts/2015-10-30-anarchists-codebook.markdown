---
layout: post
title:  "Anarchists' Codebook"
date:   2015-10-30 14:29:20
categories: tech blogging design
summary: "Code4Lib is a community of library and archives technologists who have been putting on conferences for over a decade, and this year I have the opportunity to be among the key organizers.  Code4Lib has no leadership, no authority, and no money. This is how we developed a website for this thriving community, which is an anarchy in the best sense of the word."
---

[Code4Lib](http://2016.code4lib.org) has been putting on conferences for over a decade, and this year I have the opportunity to be among the key organizers.  The popularity of the annual conference has grown steadily over the years, and we expect to max out at 450 attendees this year. What is unique about Code4Lib is that there is no organization.  There is no leadership or hierarchy.  There is no "headquarters" or geographical ties.  There is no legal entity.  It's just a name that refers to a widely distributed group of people -- a large and ever expanding group of people -- who are interested in open source technology solutions to library, museum, and archives problems. Any effort expended on Code4Lib is 100% volunteer driven.  In short, Code4Lib is an anarchy, in the best sense of the word.

![Code4Lib 2016 Conference website landing page](/img/c4l_site.jpg)

*Design for the new Code4Lib Conference site.*


And while I find it amazing that we continue to put on great conferences, publish an academic journal, and serve as a kind of technical help-desk for our peers, this lack of structure has made it increasingly challenging for conference organizers.  One of the big problems is that we can't pay for even basic things on our own.  In order to put on conferences we must find a fiscal host each year willing to sign contracts and make up-front payments.  We also depend on sponsors to help keep the registration costs down, and make the conference experience as enjoyable as possible.  Up until recently we depended on volunteers to host our conference website.

We are incredibly grateful to the folks at Oregon State University (OSU) who have been volunteering for over ten years to host our site, but the downside is that they have day jobs just like the rest of us.  As a result, Code4Lib comes nowhere close to being a priority among all the demands of anyone's employer.  As any web developer knows, no public-facing app is ever safe from security threats, updates, patches, and just plain old evolving trends and standards that make a site feel relevant.  This poses a problem because a distributed community cannot have a single point of failure.  We cannot put the kind folks at OSU in the position of subservience to the group.  At the same time, we need to move forward, and it's hard to get sponsors for a technology conference when the site looks and performs in a way that does not meet modern standards and conventions.  Our communal wiki did not even come close.

A redesign was in order.  Our goals were to:

* Empower all members of the community to contribute to the development and content of the site
* Bring the performance, design, and user experience up to modern expectations
* Gather structured data for workshops, proposals, speakers, testimonials, even gatherings.
* Use the code4lib.org domain to add authority to the site
* Host the site for free
* Get as many sponsors as possible

## Hosting
Due to the community's familiarity with and widespread adoption of GitHub, we thought GitHub Pages and Jekyll would be a great way to host the site for free and allow community collaboration.  They allowed us to use our custom domain, and the hardest part of the process was getting the OSU folks to find the time to make a  DNS change so we could use [2016.code4lib.org](http://2016.code4lib.org).

## Design
The old wiki had navigation that evolved organically, and it simply did not work for a conference site.  Furthermore, it was slow and not up to current accessibility standards.  The wiki was the opposite of forward-thinking web technologies, and did not represent the groudbreaking work members of the community did for a living.  The design process involved little more than looking at conventions for conference websites, and designing something that fit that structure.  When it came to the potentially subjective stuff (picking fonts, colors, icons, etc.) I received some good critiques, but in the spirit of Code4Lib, was mostly free to implement what I thought would work and have a little fun while I was at it. (I am particularly  pleased with the parody on the famous LOVE sculpture found in Philly's Love Park.)

## Badges of Distinction
One thing that has always irked me about Code4Lib is that the sponsors seemed somewhat removed from the community.  While everyone wore the sponsor logos on their conference t-shirts, you didn't necessarily know who was supporting the conference while you were mingling.  Having the "Badges of Distinction" printed on name tags is a great way to put a face to an impersonal logo, is a great conversation starter, and reinforces the fact that we hold our sponsors in high regard.  Sponsors often want to interact with the community, ask them for feedback on products, and even do some recruiting to fill gaps in their own teams.  I would rather have this kind of visibility any day over a keychain or brochure in the conference swag bag.  [Here are the badges I came up with](http://2016.code4lib.org/prospectus.html#General-Sponsorship), easily re-usable icons for "gamification motivators" in other projects I'm working on.

## Structured Data
We wanted to allow the community to contribute nominations for keynote speakers or talk/workshop proposals without having to make a pull request.  The process had to be as simple as possible, and we need the data to be structured to make it easy to load into our Diebold-o-tron voting app since all content-oriented conference decisions are decided democratically by the community.  Github's static site generator, Jekyll, has a way to use structured data when building a site, but we needed a more user friendly way than a "pull request" to collect that data.  In the end, we were able to create Google Forms that saved user contributed data to Spreadsheets in a structured way.  With Sheetsu, [@roastduckalamode devised a way to turn the spreadsheets into YAML](http://roastduckalamode.github.io/fromSheetsToJekyll/).  This will serve us well when we have our final speakers and schedule.  However, we need to display the data in real-time so that users know that they are not submitting a duplicate talk.  Using [Tabletop.js](https://github.com/jsoma/tabletop) [@bibliotechy](https://github.com/bibliotechy) and [@roastduckalamode](https://github.com/roastduckalamode) came up with a fairly performant way to [pull the data into the site](http://2016.code4lib.org/proposed-talks.html) using the Google Docs API.

## In the end &hellip;
Nothing's perfect, and there's still some technical overhead, but this will be by far the most usable Code4Lib conference site to date.  If it's any proof, we've already added a number of sponsors who knew nothing about Code4Lib until this year.  It's not as easy as it would seem to try to change things in a space without authority. But if, as Eric Schmidt (former CEO of Google) said, the Internet is the largest experiment in anarchy we've ever had, Code4Lib fully embodies that spirit.  
