$(function() {
  // jquery buitl-in to create tabs on web page
  $('#tabs').tabs();
  // call worldClock() with interval 1s
  $('body').onload = setInterval('localTime()', 1000);
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
  parisTime = universalTime;
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