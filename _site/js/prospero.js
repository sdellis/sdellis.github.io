$.widget("pul.prospero", {
  options: {
    endpoint: "",
    manifestUri: "",
    jsonLD: null,
    value: 0
  },
  _create: function() {

    this.element.addClass("prospero");

    var _this = this;

    this.request = jQuery.ajax({
      url: this.options.endpoint + this.options.manifestUri,
      dataType: 'json',
      async: true
    });

    this.request.done(function(jsonLd) {

      function paintPages(element, index, array) {
        $("<div id='" + index + "' class='thumbnail'></div>")
          .appendTo("#sortable")
          .html("<img src='" +
            element.images[0].resource["@id"] +
            "'><div class='caption'>" + element.label + "</div>");
      }

      this.jsonLd = jsonLd;
      $("body").data("pul-prospero-jsonLd", jsonLd);
      $("#title").text(this.jsonLd.label);
      this.jsonLd.sequences[0].canvases.forEach(paintPages);
    });

    this.refresh();
  },
  _setOption: function(key, value) {
    this._super(key, value);
  },
  _setOptions: function(options) {
    this._super(options);
    this.refresh();
  },
  reset: function() {
    // this._setOption( "value", 0 );
    this._create();
  },
  save: function() {
    // if we "stringify" it we get a "MongoError: The dotted field is not valid for storage" error.
    // if we don't stringify, the resources area is collapsed and no longer valid IIIF
    payload = JSON.stringify(this.options.jsonLd);
    console.log(payload);
    $.ajax({
      url: this.options.endpoint + this.options.manifestUri,
      contentType: "application/json",
      method: "PUT",
      data: payload,
      success: function(data, textStatus, jqXHR) {
        console.log("success!");
        $("#notice").text("Updated!");
        $("#notice").show().fadeOut(2600, "swing");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error Updating!");
      }
    });

  },
  refresh: function() {
    // this.options.jsonLd = $( "body" ).data( "pul-prospero-jsonLd");
    // this._create();
  },
  _destroy: function() {
    this.element
      .removeClass("progressbar")
      .text("");
  }
});

// draw plugin to dom >>>
var book = $("<div></div>")
  .appendTo("body")
  .prospero({
    endpoint: "http://45.55.133.0:3000/collections/manifests/",
    manifestUri: "foo:bar",
    complete: function(event, data) {
      $("#notice").text("Complete!");
      $("#notice").show().fadeOut(2600, "swing");
    }
  })
  .data("pul-prospero");

$("#sortable").sortable({
  update: function(event, ui) {
    var jsonLd = $("body").data("pul-prospero-jsonLd");
    var new_canvasArr = [];
    var sortedIDs = $("#sortable").sortable("toArray");
    var arrayLength = sortedIDs.length;
    for (var i = 0; i < arrayLength; i++) {
      new_canvasArr[i] = jsonLd.sequences[0].canvases[sortedIDs[i]];
    }
    jsonLd.sequences[0].canvases = new_canvasArr;
    book.option("jsonLd", jsonLd);
    //update the book with the new sort order
    book.save();

    $("body").data("pul-prospero-jsonLd", jsonLd);

  }
});
