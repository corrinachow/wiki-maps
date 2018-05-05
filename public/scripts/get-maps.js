function createMapElement(map) {
  const { id, title, coordinates, user_id } = map;

  const $mapBody = createMapBody(map);
  // Map outer container
  $mapContainer = $("<div>")
    .addClass("col-md-4")
    .attr("data-mapID", id);

  $mapImg = $("<div>")
    .addClass("card mb-4 box-shadow")
    .append(
      $("<img>")
        .addClass("card-img-top")
        .attr("src", "http://via.placeholder.com/288x225")
    );

  return $mapContainer.append($mapImg.append($mapBody));
}

function createMapActions(map) {
  const { id, title, coordinates, user_id } = map;

  const $viewBtn = $("<button>")
    .attr("type", "button")
    .addClass("btn btn-sm btn-outline-secondary")
    .text("View");

  const $btnGroup = $("<div>")
    .addClass("btn-group")
    .append($viewBtn);

  const $viewMapLink = $("<p>")
    // .attr("href", `/maps/${id}`)
    .append($btnGroup)
    .css("text-decoration", "none");

  const $mapLikes = $("<p>")
    .addClass("text-muted")
    .html(`<i title="Like map" class="fas fa-heart"></i> 1234`);

  const $mapActions = $("<div>")
    .addClass("d-flex justify-content-between align-items-center")
    .append($viewMapLink, $mapLikes);

  return $mapActions;
}

function createMapBody(map) {
  const { id, title, coordinates, user_id } = map;
  // card-body
  const $mapBody = $("<div>").addClass("card-body");

  const $mapCreator = $("<span>")
    .addClass("font-weight-bold")
    .text(user_id);

  const $mapTitle = $("<h3>")
    .addClass("card-text py-2").css('min-height','83px')
    .text(title);

  const $mapActions = createMapActions(map);

  return $mapBody.append($mapCreator, $mapTitle, $mapActions);
}
