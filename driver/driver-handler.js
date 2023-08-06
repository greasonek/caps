//emit in transit
'use strict';

const events = require('../eventPool');

events.on('pickup', pickup);


function pickup(data) {
  console.log({event: 'pickup'},'VENDOR: I have an order to be picked up', data);
  
  events.emit('pickedup', data);
  events.emit('inTransit', data);
  events.emit('delivered', data);
}



