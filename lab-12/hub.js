// like body in class example
'use strict';

const { Server } = require('socket.io');
const events = require('./clients/socket');

const io = new Server();
io.listen(3000);

// NAMESPACE!
const caps = io.of('/caps');

// emit = send
// on = listen

function handlePickUp(event) {
  console.log('VENDOR: I have an order to be picked up', event.payload.orderId);
  caps.emit(events.pickup, {message: 'VENDOR: I have an order to be picked up', ...event.payload});
}

function handlePickedUp(payload) {
  console.log(`VENDOR: I see order ${payload.orderId} was picked up`);
  caps.emit(events.pickedUp, payload);
}

function handleInTransit(payload) {
  console.log('The order is in transit', payload.orderId);
  caps.emit(events.inTransit, payload);
}

function handleDelivered(payload) {
  console.log(`VENDOR: Thank you for delivering`, payload.orderId);
  caps.emit(events.delivered, {message: `VENDOR: Thank you for delivering order # ${payload.orderId}`, ...payload})
}

function handleConnection(socket) {
  console.log('New connection: ', socket.id);
  socket.on(events.pickup, (payload) => handlePickUp(payload, socket));
  socket.on(events.pickedUp, handlePickedUp);
  socket.on(events.inTransit, handleInTransit);
  socket.on(events.delivered, handleDelivered);
}

function startSocketServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection)
}

module.exports = { startSocketServer, handlePickedUp, handleInTransit, handleDelivered, caps };


