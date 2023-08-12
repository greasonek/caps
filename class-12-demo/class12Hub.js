// make a new instance of a socket server
const {Server} = require('socket.io');
const events = require('./utility');

const io = new Server();
io.listen(3000);

// LAB 13 STUFF! HUB IS THE BRAIN SO IT KEEPS TRACK OF THE QUEUES
const driverQueue = new Queue();
const packageQueue = new Queue();

//NAMESPACE!!!
const caps = io.of('/caps');

// emit = send
// on = listen
function handleDriverReady(socket) {
  // this is the driver emitting they are ready
  console.log('driver # ', socket.id, 'is ready');
  if(packageQueue.isEmpty){
    // if there isn't a package then go in the queue of drivers
    driverQueue.enqueue(socket);
  } else {
    // if there IS a package, then deliver it (dequeue it to that SPECIFIC driver and their socke tand emit for the driver to pick it up)
    const package = packageQueue.dequeue();
    socket.emit(events.pickup, package);
  }
}

function handlePickUpReady(payload, socket){
  // refactor
  // when package comes in check the driver queue
  console.log('the pickup was requested', payload.orderId);
  if(driverQueue.isEmpty()){
    // if no drivers, enqueue to package queue
    packageQueue.enqueue(payload);
  } else {
    // if there is a driver, dequeue the driver and send the pacakge
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(events.pickup, payload);
  }
  //socket only emits to one socket
  socket.emit('received', {message: 'pickup acknowledged'});
  //if want to emit to all socket, use io instead of socket ---> need to change on index as well
  caps.emit(events.ready, {message: 'pickup is now ready', ...payload });
}
function handleDelivered(payload) {
  console.log(`the package for ${payload.customer} was delviered`);
  caps.emit(events.delivered, {order: payload.orderId, message: `the package for ${payload.customer} was delviered`});
}

function handlePickedUp(payload) {
  console.log('driver picked up the package', payload.orderId);
  caps.emit(events.pickedUp, payload);
}

function handleInTransit(payload) {
  console.log('the package is in transit', payload.orderId);
  caps.emit(events.inTransit, payload);
}

function handleConnection(socket) {
  console.log('we have a new connection: ', socket.id);
  // package ready for pickup - driver needs to know
  socket.on(events.pickup, (payload) => handlePickUpReady(payload, socket));
  // package picked up by driver - vendor needs to know
  socket.on(events.pickedUp, handlePickedUp);
  // package in transit - let vendor know
  socket.on(events.inTransit, handleInTransit)
  // package delivered - tell everyone
  socket.on(events.delivered, handleDelivered);
  // LAB 13 STUFF!
  // driver is ready to pick up a package --> happens before they pick up a package and after they're done, letting the vendor know they're ready to take another one
  socket.on(events.ready, (payload) => handleDriverReady(socket));
}

function startSocketServer() {
  console.log('The server has been started');
  //connection is a word that knows to listen to any client connection made
  //a socket will be passed on connection

  caps.on('connection', handleConnection)
}

module.exports = { startSocketServer, handleInTransit, handleDelivered, caps };