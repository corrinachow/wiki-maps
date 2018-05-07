$(() => {
 $("html").on("click", ".like", function() {
    const $userID = Cookies.get("user_id");
    if ($userID) {
      const $mapID = $(this).parent().parent().parent().parent().parent().data()
      $.ajax({
        type: "POST",
        url: `/api/maps/${$mapID.mapid}`,
        data: { user_id: $userID },
        success: function(data) {
        }
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
    } else {
      console.log("Not logged in")
    }
  });
});
