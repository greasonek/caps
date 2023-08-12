//publish pick up event
'use strict';

const {io} = require('socket.io-client');

const client = io('ws://localhost:3000/caps');
const events = require('../socket');


const payload = {
  customer: 'Emily',
  storename: 'Acme Widgets',
  orderId: 5,
  address: 'Olympia WA',
};

const newPayload = {
  event: 'pickup',
  messageId: order.orderId,
  storename: 'Acme Widgets',
  order: payload,
}

// client.emit(events.pickup, payload);
client.on(events.pickedUp, (payload) => console.log(`VENDOR: I see order ${payload.orderId} was picked up`));
client.on(events.delivered, (payload) => console.log({message:`VENDOR: Thank you for delivering order # ${payload.orderId}`}));

function confirmDelivery(orderId) {
  console.log('Order was received', orderId);
}
function startVendor(events) {
  console.log('Vendor started');
  events.on(events.delivered, confirmDelivery);
  events.emit('register', payload);
}

setInterval(()=> {
  console.log('--------------------------');
  let EVENT = {
    time: new Date().getTime(),
    payload: {
      store: 'Acme Widgets',
      orderId: Math.ceil(Math.random() * 100),
      customer: 'Emily',
      address: 'Olympia, WA',
    }
  }
  client.emit(events.pickup, EVENT)
  
}, 3000);


module.exports = { client, startVendor, payload };
