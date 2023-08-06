'use strict';

//Require the Events class from internal node module
const Events = require('events');
//innitialize event pool
const events = new Events();

// if 100 files require this one, they will ALL be the same events instance 
// this is called a 'singleton'
// node is smart enought to know it only has to do this once
module.exports = events;