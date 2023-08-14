import {
    cities
} from "./cities.js";

//console.log(cities);
var selectElement = document.getElementById("mySelect");

function retrievingCities() {
    var j = 0;
    var citiesKey = [];
    for (var key in cities) {
        var citiesData = cities[key]; // citiesData stores each country with their cities
        citiesKey[j] = citiesData; //citiesKey is an array to store only the cities 
        for (var i = 0; i < 2; i++) {
            var option = document.createElement('option');
            option.value = citiesData[i].name;
            option.text = citiesData[i].name + ", " + key;
            selectElement.appendChild(option);

        }
        j++;
    }
    return citiesKey;
}

function citiesLonLat(longitude, latitude) {
    fetch(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)

        .then(response => response.json())
        .then(data => {
            console.log("before");
            console.log(data); // Process the parsed JSON data
            console.log("after");

        })
        .catch(error => {
            console.error('Fetch error:', error);

        });

}
//citiesLonLat() ;
var citiesData = retrievingCities();
console.log(citiesData);
selectElement.addEventListener('change', function () {
    var selectedValue = selectElement.value;
    console.log('Selected option value:', selectedValue);
    for (var i = 0; i < citiesData.length; i++) {
        var cityGroup = citiesData[i];
        for (var j = 0; j < cityGroup.length; j++) {

            if (selectedValue === cityGroup[j].name) {
                citiesLonLat(cityGroup[j].longitude, cityGroup[j].latitude);
                break;
            }
        }

    }

})
