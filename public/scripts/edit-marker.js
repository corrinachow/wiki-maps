function editMarker(id) {
  console.log("editing Marker");
  if (Cookies.get("user_id")) {
    const markerTitle = $("#marker-title").val();
    const markerImage = $("#marker-image").val();
    const markerDesc = $("#marker-desc").val();

    const markerObj = {
      marker_id: id,
      user_id: Cookies.get("user_id"),
      title: markerTitle,
      image_url: markerImage,
      description: markerDesc
    };

    $.ajax({
      type: "POST",
      url: `/api/markers/edit`,
      data: markerObj,
      success: function(data) {
        location.reload();
      }
    });
  } else {
    console.log("No");
  }
}
