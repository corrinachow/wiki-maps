function deleteMarker(id) {
  $.ajax({
    type: "POST",
    url: `/api/markers/delete`,
    data: { marker_id: id },
    success: function(data) {
      location.reload();
    }
  });
}
