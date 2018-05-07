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
  }).done(user => {
    for (let i = 0; i < 3; i++) {
      $.ajax({
        method: "GET",
        url: `/api/maps/${user.maps[i].map_id}`
      }).done(map => {
        $(`.users-map-${i}`).replaceWith(createMapElement(map));
      });
    }
  });
});
