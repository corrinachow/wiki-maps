let map;
let lat;
let lng;


$(document).ready(function(){
  $("#location-form").on("submit", function(e){
    e.preventDefault()
    console.log('submitted')
    let mapLocation = $("#location-input").val();
    let mapTitle = $("#map-title-input").val();

    axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: mapLocation,
        key: "AIzaSyCDMocOMHEh8J4yiu_I8QMurFjMgBfrldk"
      }
    })
    .then(function(response) {
      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;

      const mapObj = {
        location: mapLocation,
        title: mapTitle,
        coordinates: { lat: lat, lng: lng }
      };

      $.ajax({
        type: "POST",
        url: "/api/maps/new",
        data: mapObj,
        success: function(data) {
          console.log(data)
          window.location.href = `/maps/${data.map_id}`;
        }
      });
    });
  });
})



  function initMap() {
  //map options

  let options = {
        zoom: 14, //max is 14
        center: {lat:45.5017, lng:-73.5673}
      }
      console.log('in initMap')
  //new map
  map = new google.maps.Map(document.getElementById("map-canvas"), options);
  console.log(document.getElementById("map-canvas"))
}