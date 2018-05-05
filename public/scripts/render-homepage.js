$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done(maps => {
    for (let i = 0; i < 9; i++) {
      $(".row").append(createMapElement(maps[i]));
    }
  });
});
