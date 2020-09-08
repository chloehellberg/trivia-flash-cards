import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Conversion from './../src/scripts.js';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    const zipCode = $('#location').val();
    $('#location').val("");
    
    let request = new XMLHttpRequest();
    const url = `https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
      ,
    };

    request.open("GET", url, true);
    request.send();
    
    function getElements(response) {
    
      let inputtedNumber = response.cod;
      function codValidate(number) {
        if (number !== 200) {
          return new Error("Not a valid number!")
        } else {
          return true;
        }
      }

      try {
        const isNumberValid = codValidate(inputtedNumber);
        if (isNumberValid instanceof Error) {
          console.error(isNumberValid.message);
          throw RangeError("Not a valid number!");
        } else {
          console.log("Try was successful, so no need to catch!");
          $('#displayNumber').text("This number is valid. You may continue.")
        }
      } catch(error) {
        console.error(`Red alert! We have an error: ${error.message}`)
      }




      const conversion = new Conversion(response.main.temp, response.visibility);
      conversion.calculateTemp();
      conversion.calculateVisibility();
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      $('.showFahrenheit').text(`The temperature in Fahrenheit is ${conversion.calculateTempToFahrenheit} degrees.`);
      $('.showWindSpeed').text(`The wind speed is ${response.wind.speed} mph`);
      $('.showWindGust').text(`The wind gust is ${response.wind.gust} mph`);
      $('.showVisibility').text(`The current visibility is ${response.visibility} meters or ${conversion.calculateToMiles} miles.`);
      $('.showClouds').text(`The current cloud cover is ${response.clouds.all}%`);
    }
  });
}); 