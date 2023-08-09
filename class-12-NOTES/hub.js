// make a new instance of a socket server
const {Server} = require('socket.io');
const events = require('./utility');

const io = new Server();
io.listen(3000);

//NAMESPACE!!!
const caps = io.of('/caps');

// emit = send
// on = listen
function handlePickUpReady(payload, socket){
  console.log('the pickup was requested', payload.orderId);
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
}

function startSocketServer() {
  console.log('The server has been started');
  //connection is a word that knows to listen to any client connection made
  //a socket will be passed on connection

  caps.on('connection', handleConnection)
}

module.exports = { startSocketServer, handleInTransit, handleDelivered, caps };