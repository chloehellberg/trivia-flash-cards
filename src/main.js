import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import Conversion from './../src/scripts.js';

$(document).ready(function() {
  $('#startGame').click(function() {
    
    $('#location').val("");
    
    let request = new XMLHttpRequest();
    const url = `https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
        console.log(this.status);
      }
      
    };

    request.open("GET", url, true);
    request.send();
    $('#form').show();
    $('#startGame').hide();
    function getElements(response) {
    
      let inputtedNumber = response.cod;
      function codValidate(number) {
        if (number !== 200) {
          return new Error("Not a valid number!");
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
          $('#displayNumber').text("This number is valid. You may continue.");
        }
      } catch(error) {
        console.error(`Red alert! We have an error: ${error.message}`)
      }
      
      $('#question1').html(`${response.results[0].question}`);
      $('#outputAnswer1').html(`${response.results[0].incorrect_answers[0]}`);
      $('#outputAnswer2').html(`${response.results[0].correct_answer}`);
      $('#outputAnswer3').html(`${response.results[0].incorrect_answers[1]}`);
      $('#outputAnswer4').html(`${response.results[0].incorrect_answers[2]}`);
      // $('.showVisibility').text(`The current visibility is ${response.visibility} meters or ${conversion.calculateToMiles} miles.`);
      // $('.showClouds').text(`The current cloud cover is ${response.clouds.all}%`);
    }
  });
}); 

const question1 = $("input:radio[name=question1]:checked").val();