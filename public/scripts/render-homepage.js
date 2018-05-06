$(() => {
  for (i = 1; i < 10; i++) {
  $.ajax({
    method: "GET",
    url: `/api/maps/${i}`
  }).done((map) => {
      $(".row").append(createMapElement(map));
    })
  };
});
