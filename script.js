/*fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json')
.then(response => response.json())
.then(data => {
    console.log(data); // Process the parsed JSON data
  })
.catch(error => {
    console.error('Fetch error:', error);
  });
  */
 var selectElement = document.getElementById("mySelect");
 fetch('cities.json')
 .then(response => response.json())
 .then(data => 
  {
    console.log(data)
    var numOfKeys = Object.keys(data).length;
    console.log(numOfKeys)
    for (var key in data) {
      /*console.log("key: ",key);
        console.log("values: ",data[key]);
      */
      var cities = data[key]
      for(var i = 0; i < 2; i++ ) {
        console.log("key: ",cities[i]);
        var option = document.createElement('option');
        option.value = cities[i].name;
        option.text = cities[i].name + ", " + key;
        selectElement.appendChild(option);
      }
    }
  }
  )
  .catch(error => console.error('Fetch error:', error));