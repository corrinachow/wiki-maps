function generateRandomImg(){
  const randomNumber = Math.random().toString().substr(3,6);
  const collectionArr = [289662,1625880,1886495, 474683]
  return `https://source.unsplash.com/collection/474683/288x255/?sig=${randomNumber}`
}

function createMapElement(map) {
  // console.log(map)
  [id] = Object.keys(map);
  const { map_id, map_coordinates, map_creator } = map[id];

  const $randomImageUrl = map.markers[Math.floor(Math.random() * map.markers.length)].marker_img_url;
  const $mapBody = createMapBody(map);
  // Map outer container
  $mapContainer = $("<div>")
    .addClass("col-md-4")
    .attr("data-mapid", map_id);

  $mapImg = $("<div>")
    .addClass("card mb-4 box-shadow")
    .append(
      $("<img>")
        .addClass("card-img-top")
        .attr("src", generateRandomImg())
    );

  return $mapContainer.append($mapImg.append($mapBody));
}

function createMapActions(map) {
  [id] = Object.keys(map);
  const { map_coordinates, favourites } = map[id];
  const $viewBtn = $("<button>")
    .attr("type", "button")
    .addClass("btn btn-sm btn-outline-secondary")
    .text("View");

  const $btnGroup = $("<div>")
    .addClass("btn-group")
    .append($viewBtn);

  const $viewMapLink = $("<a>")
    .attr("href", `/maps/${id}`)
    .append($btnGroup)
    .css("text-decoration", "none");

  const $mapLikes = $("<p>")
    .addClass("text-muted")
    .html(`<i title="Like map" class="fas fa-heart"></i> ${favourites.length}`);

  const $mapActions = $("<div>")
    .addClass("d-flex justify-content-between align-items-center")
    .append($viewMapLink, $mapLikes);

  return $mapActions;
}

function createMapBody(map) {
  [id] = Object.keys(map);
  const { map_title, map_coordinates, map_creator } = map[id];
  // card-body
  const $mapBody = $("<div>").addClass("card-body");

  const $mapCreator = $("<span>")
    .addClass("font-weight-bold text-info")
    .text(map_creator.username)
    .attr("data-userid", map_creator.user_id);

  const $mapTitle = $("<h3>")
    .addClass("card-text py-2")
    .css("min-height", "83px")
    .text(map_title);

  const $mapActions = createMapActions(map);

  return $mapBody.append($mapCreator, $mapTitle, $mapActions);
}
