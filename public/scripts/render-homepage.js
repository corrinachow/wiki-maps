$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done(maps => {
    for (let i = 1; i < 10; i++) {
      $(".row").append(createMapElement(maps[i]));
    }
  });
});
