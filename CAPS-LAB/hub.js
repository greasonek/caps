'use strict';

const { Server } = require('socket.io');
const events = require('./clients/socket');
const { payload } = require('./vendor-widgets/vendor-handler');

const io = new Server();
io.listen(3000);

// NAMESPACE!
const caps = io.of('/caps');

// emit = send
// on = listen

const driverQueue = new Queue();
const packageQueue = new Queue();
const flowersDeliveredQueue = new Queue();
const acmeWidgetsDeliveredQueue = new Queue();

function handleDriverReady(socket) {
  console.log('driver # ', socket.id, 'is ready');
  if(packageQueue.isEmpty) {
    driverQueue.enqueue(socket);
  } else {
    const order = packageQueue.dequeue();
    caps.emit(events.pickup, order);
  }
}

function handlePickUp(event) {
  console.log('VENDOR: I have an order to be picked up', event.payload.orderId);
  if(driverQueue.isEmpty()) {
    // enqueues to order queue if no drivers are available
    packageQueue.enqueue(payload);
  } else {
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(events.pickup, payload);
    // if there is a driver, dequeue the driver and send the order
  }
  caps.emit('received', {message: 'pickup acknowledged'});
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

function handleReceived() {
  flowersDeliveredQueue.dequeue();
  acmeWidgetsDeliveredQueue.dequeue();
  caps.emit(newPayload);
}

function handleGetAll(storename, socket){
  // dequeue from companies delivered queue and send all
  caps.emit(events.delivered, payload);
}

function handleConnection(socket) {
  console.log('New connection: ', socket.id);
  socket.on(events.pickup, (payload) => handlePickUp(payload, socket));
  socket.on(events.pickedUp, handlePickedUp);
  socket.on(events.inTransit, handleInTransit);
  socket.on(events.delivered, handleDelivered);
  socket.on(events.ready, (payload) => handleDriverReady(socket));
  socket.on(events.received, handleReceived);
  socket.on(events.getAll, handleGetAll);
}

function startSocketServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection)
}

module.exports = { startSocketServer, handlePickedUp, handleInTransit, handleDelivered, caps };


