function CreateUserPhoto() {
  $userPhoto = $("<img>")
    .addClass("rounded")
    .attr("data-src", "");
}

function CreateUserStats() {
  $mapsCreated = $(p).addClass("text-center font-weight-bold");
  $contributions = $(p).addClass();
}

$(() => {
  const $userID = window.location.pathname.toString().substr(7);
  $.ajax({
    method: "GET",
    url: `/api/users/${$userID}`
  })
    .done(user => {
      $(".username").text(user[$userID].username)
      for (let i = 0; i < 4; i++) {
        $.ajax({
          method: "GET",
          url: `/api/maps/${user.contributions[i].markers_map_id}`
        }).done(map => {
          $(`.users-contribution-${i}`).replaceWith(createMapElement(map));
        });
        $.ajax({
          method: "GET",
          url: `/api/maps/${user.favourites[i].map_id}`
        }).done(map => {
          $(`.users-favourite-${i}`).replaceWith(createMapElement(map));
        });
        $.ajax({
          method: "GET",
          url: `/api/maps/${user.maps[i].map_id}`
        }).done(map => {
          $(`.users-map-${i}`).replaceWith(createMapElement(map));
        });
      }
    })

  //     $.ajax({
  //   method: "GET",
  //   url: `/api/users/${$userID}`
  // }).done(user => {
  //   for (let i = 0; i < 4; i++) {
  //     $.ajax({
  //       method: "GET",
  //       url: `/api/maps/${user.maps[i].map_id}`
  //     }).done(map => {
  //       $(`.users-map-${i}`).replaceWith(createMapElement(map));
  //     });
});
