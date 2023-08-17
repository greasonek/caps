'use strict';

const { Server } = require('socket.io');
const events = require('./clients/socket');
const {Queue} = require('../CAPS-LAB/clients/socket');
// const { payload } = require('./vendor-widgets/vendor-handler');

const io = new Server();
io.listen(3000);

// NAMESPACE!
const caps = io.of('/caps');

// emit = send
// on = listen


const driverQueue = new Queue();
const packageQueue = new Queue();
// if client sends getAll, I will want one arguement(storename)
// storename = flowers, I will save their socket as flowerSocket
// storename = widgets, save socket as acmeSocket
let flowerSocket = null;
let acmeSocket = null;
const flowersDeliveredQueue = new Queue();
const acmeWidgetsDeliveredQueue = new Queue();

function handleDriverReady(socket) {
  console.log('driver # ', socket.id, 'is ready');
  if(packageQueue.isEmpty()) {
    driverQueue.enqueue(socket);
  } else {
    const order = packageQueue.dequeue();
    caps.emit(events.pickup, order);
  }
}

function handlePickUp(newPayload) {
  console.log('VENDOR: I have an order to be picked up', newPayload.messageId);
  if(driverQueue.isEmpty()) {
    // enqueues to order queue if no drivers are available
    packageQueue.enqueue(newPayload);
  } else {
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(events.pickup, newPayload);
    // if there is a driver, dequeue the driver and send the order
  }``
  caps.emit('received', {message: 'pickup acknowledged'});
  caps.emit(events.pickup, {message: 'VENDOR: I have an order to be picked up', ...newPayload.messageId});
}

function handlePickedUp(newPayload) {
  console.log(`VENDOR: I see order ${newPayload.messageId} was picked up`);
  caps.emit(events.pickedUp, newPayload);
}

function handleInTransit(newPayload) {
  console.log('The order is in transit', newPayload.messageId);
  caps.emit(events.inTransit, newPayload);
}

function handleDelivered(newPayload) {
  console.log('VENDOR: Thank you for delivering', newPayload);
  if(newPayload.storename === '1-206-Flowers'){
    // put in flowers queue
    flowersDeliveredQueue.enqueue(newPayload);
    flowerSocket.emit(events.delivered, newPayload)
  } if(newPayload.storename === 'Acme Widgets'){
    // put in widget queue
    acmeWidgetsDeliveredQueue.enqueue(newPayload);
    acmeSocket.emit(events.delivered, newPayload)
  } 
  // caps.emit(events.delivered, {message: `VENDOR: Thank you for delivering order # ${payload.orderId}`, ...payload})
}

function handleReceived(newPayload) {
  console.log('Vendor has received that order', newPayload.messageId);
  if(newPayload.storename === '1-206-Flowers'){
    // put in flowers queue
    flowersDeliveredQueue.dequeue();
  } if (newPayload.storename === 'Acme Widgets'){
    // put in widget queue
    acmeWidgetsDeliveredQueue.dequeue();
  } 
}

function handleGetAll(storename, socket){
  if(storename === '1-206-Flowers') {
    flowerSocket = socket;
    flowersDeliveredQueue.queue.forEach((order) => {
      socket.emit(events.delivered, order)
    });
  } else if (storename === 'Acme Widgets'){
    acmeSocket = socket;
    acmeWidgetsDeliveredQueue.queue.forEach((order)=> {
      socket.emit(events.delivered, order)
    });
  }
  // dequeue from companies delivered queue and send all
  caps.emit(events.delivered, payload);
}

function handleConnection(socket) {
  console.log('New connection: ', socket.id);
  socket.on(events.pickup, (payload) => handlePickUp(payload, socket));
  socket.on(events.ready, (payload) => handleDriverReady(socket));
  socket.on(events.pickedUp, handlePickedUp);
  socket.on(events.inTransit, handleInTransit);
  socket.on(events.delivered, handleDelivered);
  socket.on(events.received, handleReceived);
  socket.on(events.getAll, (storename) => handleGetAll(storename, socket));
}

function startSocketServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection)
}

module.exports = { startSocketServer, handlePickedUp, handleInTransit, handleDelivered, caps };


