var csv = require('jquery-csv');
fetch("C:/Users/o_1ivka/Documents/Myweb/frontend/src/views/airports.csv")
  .then(response => response.text())
var data_airports = $.csv.toObjects(f);

export {data_airports}