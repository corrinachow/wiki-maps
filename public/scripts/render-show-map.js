$(() => {
  const $mapID = window.location.pathname.toString().substr(6);
  $.ajax({
    method: "GET",
    url: `/api/maps/${$mapID}`
  }).done(map => {
    $("#map-title")
      .parent()
      .replaceWith(createMapView(map[$mapID]));
  });
});
