//publish pick up event
'use strict';

const {io} = require('socket.io-client');

const client = io('ws://localhost:3000/caps');
const events = require('../socket');


// function sendPickup(events) {
  const payload = {
    customer: 'Emily',
    storename: '1-206-Flowers',
    orderId: 5,
    address: 'Olympia WA',
  };
  
  const newPayload = {
    event: 'pickup',
    messageId: payload.orderId,
    storename: '1-206-Flowers',
    order: payload,
  }
  console.log('Vendor asking for pickup!', payload);
  client.emit(events.pickedUp, newPayload);



// client.emit(events.pickup, payload);
client.on(events.pickedUp, (newPayload) => console.log(`VENDOR: I see order ${newPayload.messageId} was picked up`));
client.on(events.delivered, (newPayload) => console.log({message:`VENDOR: Thank you for delivering order # ${newPayload.messageId}`}));
client.on(events.getAll, (newPayload) => console.log());

function confirmDelivery(newPayload, client) {
  console.log('Order was received', newPayload.messageId);
  client.emit('Received', newPayload);
}
function startVendor(events) {
  console.log('Vendor started');
  events.emit('getAll', '1-206-Flowers');
  events.on(events.delivered,(newPayload) => confirmDelivery(newPayload, client));
}

setInterval(()=> {
  console.log('--------------------------');
  let EVENT = {
    time: new Date().getTime(),
    payload: {
      storename: '1-206-Flowers',
      orderId: Math.ceil(Math.random() * 100),
      customer: 'Emily',
      address: 'Olympia, WA',
    }
  }
  client.emit(events.pickup, EVENT)
  
}, 3000);


module.exports = { client, startVendor, payload };
