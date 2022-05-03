// const moment = require("moment");

// //var datetime = new Date();
//     console.log((new Date()).toLocaleString().slice(0, 8));



//     var date = new Date();
// date.setDate(date.getDate() - 3);

// console.log(date);
var moment = require('moment'); 
const date = require('date-and-time')
var d = new Date()
console.log(d)
const d1= date.format(d,'YYYY/MM/DD HH:mm:ss');
console.log(moment(d).fromNow())