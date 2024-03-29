//LAB 13 STUFF

class Queue {
  constructor() {
    this.queue = [];
  }
  //the driver queue will hold driver sockets
  //the package queue will hold payloads
  enqueue(item) {
    this.queue.unshift(item); //unshift adds to begining of an array
  }
  dequeue() {
    return this.queue.pop();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = { 
  pickup: 'pickupReady',
  pickedUp: 'driverPickedUp',
  inTransit: 'inTransit',
  delivered: 'packageDelivered',
  announcement: 'announcement',
  ready: 'ready',
};