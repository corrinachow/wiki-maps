$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done(maps => {
    for (map of maps) {
      console.log(map)
    }
  });
});

function createMapElement() {

}
