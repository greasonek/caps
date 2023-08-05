//publish pick up event
'use strict';

const events = require('../eventPool');

events.on('pickedUp', pickedUp);
events.on('inTransit', inTransit);
events.on('delivered', delivered);


function pickedUp(orderId) {
  console.log('VENDOR: I see order', orderId, 'was picked up');
}
function inTransit(orderId){
  console.log({event: 'in-transit'}, orderId);
}
function delivered(orderId) {
  console.log({event: 'delivered'}, 'VENDOR: Thank you for delivering', orderId);
}

setInterval(()=> {
  console.log('--------------------------');
  let EVENT = {
    time: new Date().getTime(),
    payload: {
      store: 'Oddities n Such',
      orderId: Math.ceil(Math.random() * 100),
      customer: 'Emily',
      address: 'Olympia, WA',
    }
  }
  events.emit('pickup', EVENT)
  
}, 3000);
