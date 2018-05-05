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
    .text("Temporary");
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
    .addClass("form-text text-muted");

  // Change name for fromUrlInput
  $fromUrlInput = makeInput("text", "image-url");

  return $photoUpload = parentDiv.append(
    $uploadLabel,
    $uploadInput,
    $fileHelpSmall,
    $fromUrlInput
  );
}

function createDescriptionForm(parentDiv) {
  $markerDescLabel = makeLabel("marker-desc", "Description");
  $markerDescInput = $("<textarea>")
    .addClass("form-control")
    .attr({ id: "marker-desc", rows: "3" });

  return
}

function createMarkerForm(map) {
  const { coordinates, username } = map;

  $formGroup = $("<div>").addClass("form-group");

  // Create title input field
  $titleLabel = makeLabel("marker-title", "Title");
  $titleInput = makeInput("text", "marker-title");
  $titleGroup = $formGroup.append($titleLabel, $titleInput);

  $photoUpload = createUploadForm($formGroup);

  $markerForm = $("<form>").attr("id", "marker-input");
}

function createMapView(map) {
  console.log("In createMapView");
  const { title, coordinates, username } = map;
  $viewMapContainer = $("<div>").addClass("container");

  // Map heading
  $mapHeading = createMapHeading(title);

  console.log($mapHeading);
}

$(window).on("load", function() {
  console.log("loaded");
  $("button").on("click", function(e) {
    console.log("Button was clicked");
    e.preventDefault();

    $mapID = $(this)
      .closest(".col-md-4")
      .data("mapid");
    console.log($mapID);
    $.ajax({
      method: "GET",
      url: "/api/maps/" + $mapID
    })
      .done(([map]) => {
        console.log("fdsajklfdsjafkldsajfkdls");
        // createMapView(map);
        $("section.jumbotron").replaceWith(`<div class="container">
        <div class="row">
      <h1 class="my-4" id = "map-title">
        <small id="map-location"></small>
      </h1>

      <div class="row">
         <div class="col-md-8" id="map-canvas"></div>
         <div class="col-md-4">
          <div class="container">


<h2>Add marker</h2>
        <form id="marker-input">
           <div class="form-group">
            <label for="marker-title">Title</label>
          <input type="text" name="marker-title" class="form-control">
        </div>

              <div class="form-group">
                <label for="exampleInputFile">Upload a photo</label>
                <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                <small id="fileHelp" class="form-text text-muted"> Or upload an image URL</small>
                <input type="text" class="form-control" id="marker-title" placeholder="image url: https://">
              </div>
              <div class="form-group">
                <label for="exampleTextarea">Description</label>
                <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Submit</button>
            </form>
            </div>
          </div>
          <div id="map-info" class="my-4">
          <h3 class="d-inline my-2">by Username</h3>
          <div class="d-inline float-right pt-2">
            <span><i class="fas fa-heart"></i></span><span class="py-0 font-weight-bold text-uppercase text-muted">382937</span>
          </div>
        </div>
        </div>
        </div>
      </div>`);
      })
      .then(() => {
        $("#map-title").css("padding-top", "6rem");
        initMap();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      });
  });
});
