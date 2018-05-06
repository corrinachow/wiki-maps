let newMarker = null;
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
    console.log("initMap should not be called")
    initMap();
  });
});

function initMap() {
  //map options
  console.log("in initMap");

  //new map
  map = new google.maps.Map(document.getElementById("map-canvas"), options);
  console.log(document.getElementById("map-canvas"))

  console.log(options,'options')
    // Display multiple markers on a map
    let infoWindow = new google.maps.InfoWindow(), marker, i;

    let infoWindowContent = [];

  for (let i = 0; i < markers.length; i++) {

    const position = new google.maps.LatLng(markers[i][2], markers[i][3]);
    console.log(position);

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title:markers[i][0]
    });


infoWindowContent.push([`Title:${markers[i][0]}`])

 google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





// function initialize() {
//     var map;

//     // Multiple Markers
//     var markers = [
//         ['London Eye, London', 51.503454,-0.119562],
//         ['Palace of Westminster, London', 51.499633,-0.124755]
//     ];

//     // Info Window Content
//     var infoWindowContent = [
//         ['<div class="info_content">' +
//         '<h3>London Eye</h3>' +
//         '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
//         ['<div class="info_content">' +
//         '<h3>Palace of Westminster</h3>' +
//         '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//         '</div>']
//     ];

//     // Display multiple markers on a map
//     var infoWindow = new google.maps.InfoWindow(), marker, i;

//     // Loop through our array of markers & place each one on the map
//     for( i = 0; i < markers.length; i++ ) {
//         var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//         bounds.extend(position);
//         marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: markers[i][0]
//         });

//         // Allow each marker to have an info window


//         // Automatically center the map fitting all markers on the screen
//         map.fitBounds(bounds);
//     }

//     // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
//     var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
//         this.setZoom(14);
//         google.maps.event.removeListener(boundsListener);
//     });

// }




















// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~







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

      const mapID = window.location.pathname.toString().substr(6);

      const markerObj = {
        map_id: mapID,
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

  if (newMarker) {
    //if marker already was created change positon
    newMarker.setPosition(props.coords);
  } else {
    //create a marker
    newMarker = new google.maps.Marker({
      position: props.coords,
      map: map,
      draggable: true
    });
  }
}
