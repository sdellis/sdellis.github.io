---
layout: experiment
title: Manifest-Editor
permalink: /labs/manifest-editor/
---
## Manifest Drag 'n Drop Editor
This is a simple proof of concept for editing a IIIF Presentation API Manifest.  Drag images around to reorder them in this manifest.  As soon as the image location changes, an AJAX request is sent to the remote data store.  The remote data store is built using Express, a Node.js server, and MongoDB.  The client is built using the jQueryUI Widget Factory.  This collection of images comes from Princeton University Library's [Digital Archive of Latin American and Caribbean Ephemera](http://lae.princeton.edu).

{::options html_to_native="true" /}

<hr/>
<div class="container" style="margin-top:20px; max-width:800px;">
    <div id="notice" class="alert-info"></div>
    <h3 id="title"></h3>
    <div class="row">
      <div id="sortable">

      </div>
    </div>
</div>

<script src="{{ "/js/prospero.js" | prepend: site.baseurl }}">
