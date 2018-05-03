let map = null;

function geocode(event){

event.preventDefault();

   let location = document.getElementById('location-input').value;
   console.log(location)

   axios.get( "https://maps.googleapis.com/maps/api/geocode/json",{
    params:{
      address:location,
      key:'AIzaSyCDMocOMHEh8J4yiu_I8QMurFjMgBfrldk'
   }
  })

  .then(function(response){
    // log full response
    console.log(response)

    //formatted Address
    let formattedAddress = response.data.results[0].formatted_address;
    let formattedAddressOutput = `
    <ul class="list-group">
      <li class='list-group-item'>${formattedAddress}<li>
      </ul>
    `;

    //Geometry

    let lat = response.data.results[0].geometry.location.lat
    let lng = response.data.results[0].geometry.location.lng
    console.log(lat)
    console.log(lng)


    //output to app
    document.getElementById('formatted-address').innerHTML = formattedAddressOutput

    return map.setCenter(new google.maps.LatLng(lat,lng) );

  })

   .catch(function(error){
    console.log(error)
   })

   console.log(geocode)
}


let locationForm = document.getElementById('location-form');
console.log(locationForm);

locationForm.addEventListener('submit',geocode)

function initMap(){
    //map options
    let options = {
      zoom:14,//max is 14
      center:{lat:45.5017,
             lng:-73.5673} // center of map
            }

            console.log(options)
    //new map
    map = new google.maps.Map(document.getElementById('map-canvas'),options);

    console.log(document.getElementById('map-canvas'))
    //listen for click on map
    google.maps.event.addListener(map,'click',function(event){
        // adds maker to map by clicking on it
        addMarker({coords:event.latLng})
        $('#form').css('display','block');
      });


};



    //add marker function
    function addMarker(props){
      let marker = new google.maps.Marker({
        position:props.coords,
        map:map,
          // icon:props.iconImage
        });


      // check for icon image
      if(props.iconImage){
        marker.setIcon(props.iconImage)
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

