//emit in transit
'use strict';

const {io} = require('socket.io-client');
const events = require('../socket');


const client = io('ws://localhost:3000/caps');
client.on(events.pickup, (payload) => {
  console.log('VENDOR: I have an order to be picked up', payload);
  setTimeout(() => {
    client.emit(events.inTransit, payload);
  }, 2000);
  setTimeout(() => {
    console.log('VENDOR: Thank you for delivering');
    client.emit(events.delivered, payload);
  }, 5000);
});

module.exports = { client };

