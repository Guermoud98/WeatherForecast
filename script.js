/*fetch('phttp://www.7timer.info/bin/api.l?lon=113.17&lat=23.09&product=civillight&output=json')
.then(response => response.json())
.then(data => {
    console.log(data); // Process the parsed JSON data
  })
.catch(error => {
    console.error('Fetch error:', error);
  });
  */
  var selectElement = document.getElementById("mySelect");
  async function retrievingCities() {
    
    return fetch('cities.json')
    .then(response => response.json())
    .then(data => 
      {
        //onsole.log(data)
        var numOfKeys = Object.keys(data).length;
        //console.log(numOfKeys);
        //console.log(data);
        var cities = [];
        for (var key in data) {
          
          /*console.log("key: ",key);
            console.log("values: ",data[key]);
          */
          var citiesData  = data[key];
          for(var i = 0; i < 2; i++ ) {
            //console.log("key: ",cities[i]);
            var option = document.createElement('option');
            option.value = citiesData[i].name;
            option.text = citiesData[i].name + ", " + key;
            selectElement.appendChild(option);
            cities.push({
              name: citiesData[i].name,
              latitude : citiesData[i].latitude,
              longitude : citiesData[i].longitude

            });
          }
        }
        //console.log( cities);
       return cities;
      })
      .catch(error => console.error('Fetch error:', error));
      
  }
   
  function citiesLonLat(longitude,latitude) {
    fetch(`http://www.7timer.info/bin/api.l?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)
    .then(response => response.json())
    .then(data => {
                
                console.log(data); // Process the parsed JSON data
        
          })
    .catch(error => {
                console.error('Fetch error:', error);
              
    });
            
  }
  retrievingCities()
  selectElement.addEventListener('change', function() {
    var selectedValue = selectElement.value; 
    console.log('Selected option value:', selectedValue);
    retrievingCities().then(cities => {
      // Here, you can work with the array of cities
      //console.log(cities);
      for(var i = 0; i < cities.length; i++) {
            if(selectElement === cities[i].name) {
              citiesLonLat(cities[i].longitude,cities[i].latitude);
              break;
            }
          }




    });
    
  
  });
 
  
  
  
  
  


  fetch("http://www.7timer.info/bin/api.pl?lon=19.945&lat=50.065&product=civillight&output=json")
    .then(response => response.json())
    .then(data => {
                console.log("before");
                console.log(data); // Process the parsed JSON data
                console.log("after");
          })
    .catch(error => {
                console.error('Fetch error:', error);
              
    });