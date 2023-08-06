'use strict';
// require the events class from internal node module
const Events = require('./eventPool');
const arms = require('../modular/arms');
// not a file or an installation but is an internal node module
// file module would have been ('./events)
// installation would have required to do npm i events

//initialize and 'event pool'(like the brain, manages all events)
const events = new Events();

// the order of how these are brought in matters!
require('../modular/hair');
require('../modular/arms');
require('../modular/skin');
require('../modular/eyes');

// publish or broadcast the 'light' event
setInterval(() => {
  console.log('----------------');
  let brightness = Math.ceil(Math.random() * 100);
  events.emit('light', { event:'light', brightness });
}, 2000);


// store emits this on
// events.emit('pickup', {order:15. customer:'emily'});

// //driver emits these
// events.emit('picked-up', {order:15, customer:'emily'});
// events.emit('in-transit', {order:15, customer:'emily'});
// events.emit('delivered', {order:15, customer:'emily'});