let marker;
let map;
const latitude = [];
const longitude = [];
let options;
const markers = [];

$("#location-form").on("submit", function(e) {
  e.preventDefault();
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
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;

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
          console.log(data);
          window.location.href = `/maps/${data[0].id}`;
        }
      });
    });
});

$(() => {
  const mapID = window.location.pathname.toString().substr(6);
  $.ajax({
    type: "GET",
    url: `/api/maps/${mapID}`
  })
    .done(function(map) {
      const { x, y } = map[mapID].map_coordinates;
      options = {
        zoom: 14, //max is 14
        center: {
          lat: x,
          lng: y
        } // center of map
      };
      for (const marker of map.markers) {
        const { marker_title, marker_description, marker_coordinates } = marker;
        const markerArray = [];

        const { x, y } = marker_coordinates;
        markerArray.push(marker_title, marker_description, x, y);
        markers.push(markerArray);
      }
    })
    .then(() => {
      console.log(markers);
      initMap();
    });
});

function initMap() {
  //map options
  console.log("in initMap");

  //new map
  map = new google.maps.Map(document.getElementById("map-canvas"), options);

  for (const m of markers) {
    console.log(m);
    const position = new google.maps.LatLng(m[2], m[3]);
    console.log(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: m[0]
    });
  }
  //listen for click on map
  google.maps.event.addListener(map, "click", function(event) {
    addMarker({ coords: event.latLng });

    $("#marker-form").on("submit", function(e) {
      console.log("inside marker form submission");
      e.preventDefault();

      console.log(e.target);
      let markerTitle = $("#marker-title").val();
      let markerImage = $("#marker-image").val();
      let markerDesc = $("#marker-desc").val();

      const markerObj = {
        title: markerTitle,
        image_url: markerImage,
        description: markerDesc,
        coordinates: {
          lat: latitude[latitude.length - 1],
          lng: longitude[longitude.length - 1]
        }
      };

      $.ajax({
        type: "POST",
        url: "/api/markers/new",
        data: markerObj,
        success: function(data) {
          console.log("~~~~~~~~~");
          console.log(data, "data");
          window.location.href = `/maps/${data.map_id}`;
        }
      });
    });
  });
}

//add marker function
function addMarker(props) {
  latitude.push(props.coords.lat());
  longitude.push(props.coords.lng());

  if (marker) {
    //if marker already was created change positon
    marker.setPosition(props.coords);
  } else {
    //create a marker
    marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      draggable: true
    });
  }
}
