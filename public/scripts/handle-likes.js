$(window).on("load", () => {
  console.log('Handle likes loaded')

  $(".like").on("click", function() {

    const $mapID = window.location.pathname.toString().substr(6);

    $.post("/api/maps/" + $mapID, res => {
      console.log(res)

    });

    const currentLikes = Number(
      $(this)
      .siblings(".likes")
      .text()
    );
    // Use arrow function to select current element & scope $(this) in $.post
    if ($(this).css("color") === "rgb(255, 0, 0)") {
      $(this).css("color", "rgb(36, 71, 81)");
      $(this)
        .siblings(".likes")
        .text(currentLikes - 1);
    } else {
      $(this).css("color", "rgb(255, 0, 0)");
      $(this)
        .siblings(".likes")
        .text(currentLikes + 1);
    }
  });
});
