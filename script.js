import {
    cities
} from "./cities.js";

//console.log(cities);
var selectElement = document.getElementById("mySelect");
var parent = document.getElementById("container");
var childDivs = document.querySelectorAll(".child");
var date = document.querySelectorAll(".date");
var img = document.querySelectorAll(".img");
var weather = document.querySelectorAll(".weather");
var max = document.querySelectorAll(".max");
var min = document.querySelectorAll(".min");

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
            console.log(data); // Process the parsed JSON data
            for (var i = 0; i < data.dataseries.length; i++) {
                var dataseries = data.dataseries[i];
                weather[i].textContent = dataseries.weather;
                max[i].textContent += dataseries.temp2m.max;
                min[i].textContent += dataseries.temp2m.min;
                date[i].textContent = dataseries.date;
                //img
                if(dataseries.weather === "clear" ) {
                    img[i].src = "clear.png"
                }
                if(dataseries.weather === "cloudy" ) {
                    img[i].src = "cloudy.png"
                }
                if(dataseries.weather === "fog" ) {
                    img[i].src = "fog.png"
                }
                if(dataseries.weather === "ishower" ) {
                    img[i].src = "ishower.png"
                }
                if(dataseries.weather === "lightrain" ) {
                    img[i].src = "lightrain.png"
                }
                if(dataseries.weather === "lightsnow" ) {
                    img[i].src = "lightsnow.png"
                }
                if(dataseries.weather === "mcloudy" ) {
                    img[i].src = "mcloudy.png"
                }
                if(dataseries.weather === "oshower" ) {
                    img[i].src = "oshower.png"
                }
                if(dataseries.weather === "pcloudy" ) {
                    img[i].src = "pcloudy.png"
                }
                if(dataseries.weather === "rain" ) {
                    img[i].src = "rain.png"
                }
                if(dataseries.weather === "rainsnow" ) {
                    img[i].src = "rainsnow.png"
                }
                if(dataseries.weather === "snow" ) {
                    img[i].src = "snow.png"
                }
                if(dataseries.weather === "tsrain" ) {
                    img[i].src = "tsrain.png"
                }
                if(dataseries.weather === "tstorm" ) {
                    img[i].src = "tstorm.png"
                }

            }

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