function makeLabel(forAttr, text) {
  return $("<label>")
    .attr("for", forAttr)
    .text(text);
}

function makeInput(type, name) {
  return $("<input>").attr({ type: type, name: name });
}

function createMapHeading(map) {
  const { map_title, map_location } = map;

  $mapLocationSmall = $("<small>")
    .attr("id", "map-location")
    .text(` ${map_location}`);
  return ($mapHeading = $("<h1>")
    .addClass("my-4")
    .attr("id", "map-title")
    .append(map_title, $mapLocationSmall));
}

function createUploadForm(parentDiv) {
  $uploadLabel = makeLabel("img-url", "Upload a photo");
  $uploadInput = makeInput("file", "img-url");

  $fileHelpSmall = $("<small>")
    .attr("id", "fileHelp")
    .addClass("form-text text-muted")
    .text("Use an image URL");

  // Change name for fromUrlInput
  $fromUrlInput = makeInput("text", "marker-url").attr({
    id: "marker-image",
    name: "marker_image"
  });

  return parentDiv.append(
    $fileHelpSmall,
    $fromUrlInput.addClass("form-control")
  );
}

function createDescriptionForm(parentDiv) {
  $markerDescLabel = makeLabel("marker-desc", "Description");
  $markerDescInput = $("<textarea>")
    .addClass("form-control")
    .attr({ id: "marker-desc", rows: "3", name: "marker_description" });

  return parentDiv.append($markerDescLabel, $markerDescInput);
}

function createMarkerForm(map) {
  const { map_coordinates, map_creator } = map;

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
  $markerForm = $("<form>").attr({
    id: "marker-form",
    method: "POST"
    // action: "/api/markers/new"
  });

  return $markerForm.append($titleGroup, $photoUpload, $markerDesc, $submitBtn);
}

function createMapView(map) {
  const { favourites } = map;

  const $mapCanvas = $("<div>")
    .addClass("col-md-8")
    .attr("id", "map-canvas");

  const $viewMapContainer = $("<div>").addClass("container map");

  // Map heading
  const $mapHeading = createMapHeading(map);

  // Marker form field
  const $markerFormField = createMarkerForm(map);

  const $mapFooter = createMapsFooter(map);

  const $formWrap = $("<div>")
    .addClass("col-md-4")
    .append($markerFormField);
  const $row = $("<div>")
    .addClass("row")
    .append($mapCanvas, $formWrap, $mapFooter)
    .css("margin-left", "0");

  return $viewMapContainer.append($mapHeading, $row);
}

function createMapsFooter(map) {
  const { map_creator, favourites } = map;

  const $byUsername = $("<h3>")
    .addClass("d-inline my-2")
    .text(`by ${map_creator.username}`);

  const $mapLikes = createMapLikes(map);

  $mapInfo = $("<div>")
    .attr("id", "map-info")
    .addClass("my-4");

  return $mapInfo.append($byUsername, $mapLikes);
}

function createMapLikes(map) {
  const { favourites } = map;
  const $likeBtn = $("<span>")
    .addClass("like")
    .html(`<i title="Like map" class="fas fa-heart"></i>`);

  for (const favourite of favourites) {
    if (Cookies.get("user_id") == favourite.user_id) {
      $likeBtn.css("color", "rgb(255, 0, 0)");
    }
  }

  const $likeAmt = $("<span>")
    .addClass("py-0 font-weight-bold text-uppercase text-muted likes ml-2")
    .text(`${favourites.length}`);

  const $mapLikes = $("<div>")
    .addClass("d-inline pt-2 ml-5")
    .append($likeBtn, $likeAmt);

  return $mapLikes;
}
$(window).on("load", function() {
  $("button").on("click", function(e) {
    console.log("Button was clicked");

    $mapID = $(this)
      .closest(".col-md-4")
      .data("mapid");

    $.ajax({
      method: "GET",
      url: "/api/maps/" + $mapID
    })
      .done(map => {
        let $mapView = createMapView(map[$mapID]).css("display", "none");

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
// });
