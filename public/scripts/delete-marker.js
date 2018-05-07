function deleteMarker(id) {
  if (Cookies.get("user_id")) {
    $.ajax({
      type: "POST",
      url: `/api/markers/delete`,
      data: { marker_id: id },
      success: function(data) {
        location.reload();
      }
    });
  } else {
    console.log("No")
  }
}
