
$("#location-form").on("submit",function(e){
  e.preventDefault()
  let mapLocation = $('#location-input').val()
  let mapTitle = $('#map-title-input').val()
    axios.get( "https://maps.googleapis.com/maps/api/geocode/json",{
    params:{
      address:mapLocation,
      key:'AIzaSyCDMocOMHEh8J4yiu_I8QMurFjMgBfrldk'
    }}).then(function(response){

    let lat = response.data.results[0].geometry.location.lat
    let lng = response.data.results[0].geometry.location.lng

    const inputObj = {
      location:mapLocation,
      title:mapTitle,
      coordinates:{'lat':lat,'lng':lng}
    }

    $.ajax({
      type: 'POST',
      url: '/api/maps/new',
      data:inputObj,
      success: function(data){
        console.log(data)
        window.location.href = `/maps/${data[0].id}`;
      }

    })
  });

})

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


    // if(($("#marker-input").css('display') === 'none')){
    //       $("#marker-input").toggle(500,"linear");
    //       $("#location-form").slideUp();
    //     }



// changing icons ( optional )

// $('input[type=radio][name="optionsRadios"]').change(function() {
//   if ($("input[name=optionsRadios]:checked")){
//     marker.setIcon($("input[name=optionsRadios]:checked").next().attr(''))
//   }
// });

// function geocode(){


//     //formatted Address
//     let formattedAddress = response.data.results[0].formatted_address;

//     document.getElementById('map-location').textContent = formattedAddress;
//     document.getElementById('map-title').textContent = input.title;

//     // if(($("#marker-input").css('display') === 'none')){
//     //       $("#marker-input").toggle(500,"linear");
//     //       $("#location-form").slideUp();
//     //     }

//     return map.setCenter(new google.maps.LatLng(lat,lng) );


//   })







