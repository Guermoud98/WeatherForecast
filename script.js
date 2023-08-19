//Importing the cities variable
import {
    cities
} from "./cities.js";

//console.log(cities);

//Selecting elements from HTML
var selectElement = document.getElementById("mySelect");
var parent = document.getElementById("container");
var date = document.querySelectorAll(".date");
var img = document.querySelectorAll(".img");
var weather = document.querySelectorAll(".weather");
var max = document.querySelectorAll(".max");
var min = document.querySelectorAll(".min");
var loading = document.querySelector(".loading");

//Function to retrieve city names and display them as options
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

//The citiesData variable contains an array of objects returned from the retrievingCities function
var citiesData = retrievingCities();
console.log(citiesData);

//This event listener helps us obtain the weather forecast for the selected option
selectElement.addEventListener('change', function () {
    //Displaying the div containing all seven cards representing the weather forecast for seven days.
    loading.style.display = "block";
    //Storing the clicked option in a varible
    var selectedValue = selectElement.value;
    console.log('Selected option value:', selectedValue);
    //Looping through the array citiesData to compare the value clicked (option) with the one stored in citiesData
    for (var i = 0; i < citiesData.length; i++) {
        //Storing the i object of the citisData in a variable called cityGroup to loop through it
        var cityGroup = citiesData[i];
        for (var j = 0; j < cityGroup.length; j++) {
            //If the condition is true, we call the citiesLonlat function to use the 7timer API and retrieve the weather forecast for the longitude and latitude of the selected city
            if (selectedValue === cityGroup[j].name) {
                citiesFetch(cityGroup[j].longitude, cityGroup[j].latitude);
                break;
            }
        }

    }

})

//This function fetches weather forecast data from the 7timer API based on coordinates and updates the forecast display
function citiesFetch(longitude, latitude) {
    fetch(`https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)

        .then(response => response.json())
        .then(data => {
            console.log(data); // Process the parsed JSON data
            loading.style.display = "none";
            //Looping through data.dataseries array of objects
            for (var i = 0; i < data.dataseries.length; i++) {
                //Storing the i object in dataseries variable
                var dataseries = data.dataseries[i];
                //Assigning the weather values retrieved from the API to a variable named weather[i] and displaying it on the webpage
                weather[i].textContent = dataseries.weather;
                //Assigning the max temperature values retrieved from the API to a variable named max[i] and displaying it on the webpage
                max[i].textContent = "H: " + dataseries.temp2m.max + "C°";
                //Assigning the min temperature values retrieved from the API to a variable named min[i] and displaying it on the webpage
                min[i].textContent = "L: " + dataseries.temp2m.min + "C°";
                //date : 
                //Storing the returned value from the readableDate function in the dateValue variable.
                var dateValue = readableDate(dataseries.date); //dateValue variable is a string
                //Creating a new date object to convert the string date into a date object
                var dateObject = new Date(dateValue); // output example : Tue May 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
                //Converting the date object into a string using specific parameters (output: Tue May 10 2022)
                var d = dateObject.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                //console.log(dateObject);
                //.log(typeof(d));

                //Displaying the date on the web page
                date[i].textContent = d;

                //console.log(typeof(dataseries.date));

                //img
                if (dataseries.weather === "clear") {
                    img[i].src = "clear.png"
                }
                if (dataseries.weather === "cloudy") {
                    img[i].src = "cloudy.png"
                }
                if (dataseries.weather === "fog") {
                    img[i].src = "fog.png"
                }
                if (dataseries.weather === "ishower") {
                    img[i].src = "ishower.png"
                }
                if (dataseries.weather === "lightrain") {
                    img[i].src = "lightrain.png"
                }
                if (dataseries.weather === "lightsnow") {
                    img[i].src = "lightsnow.png"
                }
                if (dataseries.weather === "mcloudy") {
                    img[i].src = "mcloudy.png"
                }
                if (dataseries.weather === "oshower") {
                    img[i].src = "oshower.png"
                }
                if (dataseries.weather === "pcloudy") {
                    img[i].src = "pcloudy.png"
                }
                if (dataseries.weather === "rain") {
                    img[i].src = "rain.png"
                }
                if (dataseries.weather === "rainsnow") {
                    img[i].src = "rainsnow.png"
                }
                if (dataseries.weather === "snow") {
                    img[i].src = "snow.png"
                }
                if (dataseries.weather === "ts") {
                    img[i].src = "tsrain.png"
                }
                if (dataseries.weather === "tstorm") {
                    img[i].src = "tstorm.png"
                }

            }
            //Displaying the cards
            parent.style.display = "block";
            parent.style.display = "flex";
            parent.style.justifyContent = "center";

        })
        .catch(error => {
            console.error('Fetch error:', error);

        });

}
//citiesLonLat() ;

//This function converts a date number (e.g., 20230816) into a string format separated by hyphens (e.g., 2023-08-16)
function readableDate(dateNumber) {
    var d = dateNumber.toString();
    var year = d.substring(0, 4);
    var month = d.substring(4, 6);
    var day = d.substring(6, 8);
    var date = year + "-" + month + "-" + day;
    return date;
}