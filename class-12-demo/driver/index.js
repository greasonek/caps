'use strict';
// makes a client socket.io connection

const {io} = require('socket.io-client');
const events = require('../utility');


const client = io('ws://localhost:3000');
client.on(events.announcment, (payload) => console.log(payload.message));
client.on(events.ready, (payload) => {
  console.log('the package is ready to be picked up');
  setTimeout(() => {
    client.emit(events.inTransit, payload);
  }, 2000);
  setTimeout(() => {
    console.log('the package has been delivered');
    client.emit(events.delivered, payload);
  }, 5000);
});

module.exports = {client};