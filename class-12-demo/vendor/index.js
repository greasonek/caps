'use strict';
// makes a client socket.io connection

const {io} = require('socket.io-client');

const client = io('ws://localhost:3000/caps');
const events = require('../utility');


const payload = {
  customer: 'Emily',
  storename: 'Oddities',
  orderId: 5,
  address: 'Olympia WA'
};

// emit says "broadcast"
client.emit(events.pickup, payload);
client.on('reveived', (payload) => console.log(payload.message));
client.on(events.announcement, (payload) => console.log(payload.message));
// put this in driver index as well
client.on(events.pickedUp, (payload) => console.log('the package is in transit', payload.orderId));
client.on(events.delivered, (payload) => console.log({message: `the package for ${payload.customer} was delviered`}));

module.exports = {client};