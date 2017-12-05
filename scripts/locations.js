"use strict";

$(function() {
  // jquery buitl-in to create tabs on web page
  $('#tabs').tabs();
  // call worldClock() with interval 1s
  $('body').onload = setInterval('localTime()', 1000);
  $('button').on('click', function() {
    $('.clock').slideToggle();
  })
});

/**
 * @param {any} oldTime
 * @param {any} milliseconds
 */
function addTime(oldTime, milliseconds) {
  // Declare and Initialize variables
  var newTime = new Date();
  var newValue = oldTime.getTime() + milliseconds;
  // Processing
  newTime.setTime(newValue);

  return newTime;
}

/**
* create showDate() function
* returns the current date the format mm/dd/yyyy
* @param {any} dateObj
*/
function showDate(dateObj) {
  // extract date, month and year from dateObj
  var theDate = dateObj.getDate();
  var theMonth = dateObj.getMonth() + 1;
  var theYear = dateObj.getFullYear();

  var result = theMonth + "/" + theDate + "/" + theYear;
  return result;
}

/**
 * showTme() function returns the current time in the format hh:mm:ss am/pm
 * @param {any} dateObj
 */
function showTime(dateObj) {
  // extract hour, minutes and seconds from the dateObj
  var thisHour = dateObj.getHours();
  var thisMinute = dateObj.getMinutes();
  var thisSecond = dateObj.getSeconds();

  // add leading zero to thisMinute, thisSecond if they are less than 10
  // thisHour = (thisHour < 10) ? ("0" + thisHour) : ("" + thisHour);
  thisMinute = (thisMinute < 10) ? ("0" + thisMinute) : ("" + thisMinute);
  thisSecond = (thisSecond < 10) ? ("0" + thisSecond) : ("" + thisSecond);

  // convert thisHour from 24-hour format to 12-format by
  // if thisHour < 12 set the variable ampm to am, otherwise to pm
  var ampm = (thisHour < 12) ? "am" : "pm";
  // if thisHour greater than 12
  thisHour = (thisHour > 12) ? (thisHour - 12) : thisHour;
  // if thisHour equals zero, then change it to 12
  thisHour = (thisHour == 0) ? 12 : thisHour;

  return thisHour + ":" + thisMinute + ":" + thisSecond + " " + ampm;
}

/**
 * localTme() function process times at several locations
 * @param {}
 */
function localTime() {
  // Declaration
  var today, offset, universalTime;
  var washingtonTime, montrealTime, parisTime, melburneTime, seoulTime;
  // Initialization
  today = new Date();
  offset = today.getTimezoneOffset() * 60 * 1000;
  universalTime = addTime(today, offset);

  montrealTime = addTime(universalTime, (-300) * 60 * 1000);
  washingtonTime = addTime(universalTime, (-480) * 60 * 1000);
  parisTime = addTime(universalTime, 60 * 60 *1000);
  seoulTime = addTime(universalTime, 540 * 60 * 1000);
  melburneTime = addTime(universalTime, 660 * 60 * 1000);

  // Processing
  document.getElementById('washingtonTime').value = showTime(washingtonTime);
  document.getElementById('montrealTime').value = showTime(montrealTime);
  document.getElementById('parisTime').value = showTime(parisTime);
  document.getElementById('melburneTime').value = showTime(melburneTime);
  document.getElementById('seoulTime').value = showTime(seoulTime);

  document.getElementById('washingtonDate').value = showDate(washingtonTime);
  document.getElementById('montrealDate').value = showDate(montrealTime);
  document.getElementById('parisDate').value = showDate(parisTime);
  document.getElementById('melburneDate').value = showDate(melburneTime);
  document.getElementById('seoulDate').value = showDate(seoulTime);
}

var waitForUser;

function setUpPage() {
  var buttons = document.getElementById('tabs').getElementsByTagName('a');
  for (var idx in buttons) {
    if (buttons[idx].addEventListener) {
      buttons[idx].addEventListener('click', createMap, false);
    }
    else if (buttons[idx].attachEvent) {
      buttons[idx].attachEvent('onclick', createMap);
    }
  }
}

function geoTest() {
  waitForUser = setTimeout(fail, 10000);
  if (navigator.geolocation) {
    setTimeout(navigator.geolocation.getCurrentPosition(createMap, fail), 10000);
  }
  else {
    fail();
  }
}

function createMap(position) {
  // Washington: 38.912749, -77.040679
  // Montreal: 45.5057346,-73.6025516
  // Paris: 48.862000, 2.349118
  // Melbourne: -37.836873, 144.987056
  // Seoul: 37.561210, 126.977462
  var Lat, Lng;
  clearTimeout(waitForUser);
  if (position.coords) {
    Lat = position.coords.latitude;
    Lng = position.coords.longitude;
  }
  else {
    var city = this.innerHTML;
    if (city === 'Washington') {
      Lat = 38.912749;
      Lng = -77.040679;
    }
    else if (city === 'Montreal') {
      Lat = 45.5057346;
      Lng = -73.6025516;
    }
    else if (city === 'Paris') {
      Lat = 48.862000;
      Lng = 2.349118;
    }
    else if (city === 'Melbourne') {
      Lat = -37.836873;
      Lng = 144.987056;
    }
    else if (city === 'Seoul') {
      Lat = 37.561210;
      Lng = 126.977462;
    }

    document.getElementById('caption').innerHTML = city;
  }

  var mapOptions = {
    center: new google.maps.LatLng(Lat, Lng),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function fail() {
  document.getElementById('map').innerHTML = "Unable to access your current location.";
}

window.addEventListener('load', setUpPage, false);