let map
let marker

function geocode(input){

  event.preventDefault();

  console.log(input,'inside geocode')

  axios.get( "https://maps.googleapis.com/maps/api/geocode/json",{
    params:{
      address:input.location,
      key:'AIzaSyCDMocOMHEh8J4yiu_I8QMurFjMgBfrldk'
    }
  })

  .then(function(response){
    // log full response
    console.log(response)
    //formatted Address
    let formattedAddress = response.data.results[0].formatted_address;
    //Geometry

    let lat = response.data.results[0].geometry.location.lat
    let lng = response.data.results[0].geometry.location.lng



     $.ajax({
      type: 'POST',
      url: '/api/maps/new',
      dataType: "json",
      data: {'lat':lat,'lng':lng},
      success: function(data){
        console.log('success')
      }
    });

    console.log(lat)
    console.log(lng)

    //output to app
    console.log(formattedAddress)
    console.log(document.getElementById('map-location'))
    document.getElementById('map-location').textContent = formattedAddress;
    document.getElementById('map-title').textContent = input.title;

    if(($("#marker-input").css('display') === 'none')){
          $("#marker-input").toggle(500,"linear");
          $("#location-form").slideUp();
        }

    return map.setCenter(new google.maps.LatLng(lat,lng) );


  })

  .catch(function(error){
    console.log(error)
  })

  console.log(geocode)
}

  $("#location-form").on("submit",function(event){

  event.preventDefault();

  $.ajax({
      type: 'POST',
      url: '/api/maps/new',
      data: $( this ).serialize(),
      success: function(data){
        console.log('success')
        geocode(data)
      }

})
});

function initMap(){
    //map options
    let options = {
      zoom:14,//max is 14
      center:{lat:45.5017,
             lng:-73.5673} // center of map
           }

           console.log(options)
    //new map
map = new google.maps.Map(document.getElementById('map-canvas'),options)

console.log(document.getElementById('map-canvas'))
    //listen for click on map
google.maps.event.addListener(map,'click',function(event){

    addMarker({coords:event.latLng})
});

};



    //add marker function
    function addMarker(props){
      console.log(props.coords)
      if (marker) {
        //if marker already was created change positon
        marker.setPosition(props.coords);

    } else {
        //create a marker
        marker = new google.maps.Marker({
            position:props.coords,
            map: map,
            draggable: true
        });
    }

    // check for eventlistner
    if(props.desc){
      let infoWindow = new google.maps.InfoWindow({
       content:'<h1>'+ props.desc + '</h1>'})

      marker.addListener('click',function(){
      infoWindow.open(map,marker);

     })

    }
    markers.push(props);
  }

  let markers = [
  {
    coords:{lat:45.5017,lng:-73.5673},
    iconImage:'./coffee.png'
  },
  {
    coords:{lat:45.4861,lng:-73.5737},
    desc:'best app ever'
  },
  {
    coords:{lat:45.5236,lng:-73.5985},
    desc:'Hello World'
  }
  ]

  console.log(markers);



//submit to database


// changing icons ( optional )

// $('input[type=radio][name="optionsRadios"]').change(function() {
//   if ($("input[name=optionsRadios]:checked")){
//     marker.setIcon($("input[name=optionsRadios]:checked").next().attr(''))
//   }
// });







