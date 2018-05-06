$(window).on("load", function() {
  const mapID = window.location.pathname.toString().substr(6);
  $.ajax({
    method: "GET",
    url: `/api/maps/${mapID}`
  }).done(map => {
    console.log(map)
    $("#map-title").parent().replaceWith(createMapView(map[mapID]));
  });
});
