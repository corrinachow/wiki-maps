function makeLabel(forAttr, text) {
  return $("<label>")
    .attr("for", forAttr)
    .text(text);
}

function makeInput(type, name) {
  return $("<input>").attr({ type: type, name: name });
}

function createMapHeading(title) {
  $mapLocationSmall = $("<small>")
    .attr("id", "map-location")
    .text(" Temporary");
  return ($mapHeading = $("<h1>")
    .addClass("my-4")
    .attr("id", "map-title")
    .append(title, $mapLocationSmall));
}

function createUploadForm(parentDiv) {
  $uploadLabel = makeLabel("img-url", "Upload a photo");
  $uploadInput = makeInput("file", "img-url");

  $fileHelpSmall = $("<small>")
    .attr("id", "fileHelp")
    .addClass("form-text text-muted")
    .text("Or upload an image URL");

  // Change name for fromUrlInput
  $fromUrlInput = makeInput("text", "image-url");

  return parentDiv.append(
    $uploadLabel,
    $uploadInput.addClass("form-control-file"),
    $fileHelpSmall,
    $fromUrlInput.addClass("form-control")
  );
}

function createDescriptionForm(parentDiv) {
  $markerDescLabel = makeLabel("marker-desc", "Description");
  $markerDescInput = $("<textarea>")
    .addClass("form-control")
    .attr({ id: "marker-desc", rows: "3" });

  return parentDiv.append($markerDescLabel, $markerDescInput);
}

function createMarkerForm(map) {
  const { coordinates, username } = map;

  $formGroup = $("<div>").addClass("form-group");

  // Create title input field
  $titleLabel = makeLabel("marker-title", "Title");
  $titleInput = makeInput("text", "marker-title");
  $titleGroup = $("<div>")
    .addClass("form-group")
    .append($titleLabel, $titleInput.addClass("form-control"));

  $photoUpload = createUploadForm($formGroup);
  $markerDesc = createDescriptionForm($formGroup);

  $submitBtn = $("<button>")
    .attr("type", "submit")
    .addClass("btn btn-primary btn-block")
    .text("Submit");
  $markerForm = $("<form>").attr("id", "marker-input");

  return $markerForm.append($titleGroup, $photoUpload, $markerDesc, $submitBtn);
}

function createMapView(map) {
  console.log("In createMapView");
  const { title, coordinates, username } = map;

  const $mapCanvas = $("<div>")
    .addClass("col-md-8")
    .attr("id", "map-canvas");

  const $viewMapContainer = $("<div>").addClass("container map");

  // Map heading
  const $mapHeading = createMapHeading(title);

  // Marker form field
  const $markerFormField = createMarkerForm(map);

  const $formWrap = $("<div>")
    .addClass("col-md-4")
    .append($markerFormField);
  const $row = $("<div>")
    .addClass("row")
    .append($mapCanvas, $formWrap).css("margin-left", "0");
  return $viewMapContainer.append($mapHeading, $row);
}

$(window).on("load", function() {
  $("button").on("click", function(e) {
    console.log("Button was clicked");

    $mapID = $(this)
      .closest(".col-md-4")
      .data("mapid");
    console.log($mapID);
    $.ajax({
      method: "GET",
      url: "/api/maps/" + $mapID
    })
      .done(([map]) => {
        let $mapView = createMapView(map).css("display", "none");

        if ($("section.jumbotron").length > 0) {
          $("section.jumbotron").replaceWith($mapView);
        } else {
          $("div.map").replaceWith($mapView);
        }
        $(".map").fadeIn();
      })
      .then(() => {
        $("#map-title").css("padding-top", "6rem");
        initMap();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      });
  });
});
