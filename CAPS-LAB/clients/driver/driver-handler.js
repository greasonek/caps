//emit in transit
'use strict';

const {io} = require('socket.io-client');
const events = require('../socket');

function startDriver(io){
  console.log('Driver started');
  io.emit(events.ready);
  io.on(events.pickup, (newPayload) => handlePickedUp(newPayload, io));
}

const client = io('ws://localhost:3000/caps');
client.on(events.pickup, (newPayload) => {
  console.log('VENDOR: I have an order to be picked up', newPayload.messageId);
  setTimeout(() => {
    client.emit(events.inTransit, newPayload);
  }, 2000);
  setTimeout(() => {
    console.log('VENDOR: Thank you for delivering', newPayload.messageId);
    client.emit(events.delivered, newPayload.messageId);
  }, 5000);
});



module.exports = { client, startDriver };

