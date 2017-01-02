// moment.js is much easier to use that the usual date object

var moment = require('moment');
var now = moment();

console.log(now.format());
// time and minutes with lowercase am/pm
console.log(now.format("MMM Do, YYYY, h:mma"));
