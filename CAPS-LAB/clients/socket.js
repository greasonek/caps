class Queue {
  constructor() {
    this.queue = [];
  }
  // driver queue holds driver socket
  // package queue holds payload
  enqueue(item) {
    this.queue.unshift(item);
  }
  dequeue() {
    return this.queue.pop();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  
}

module.exports = { 
  Queue,
  pickup: 'pickupReady',
  pickedUp: 'driverPickedUp',
  inTransit: 'inTransit',
  delivered: 'Delivered',
  ready: 'ready',
  received: 'received',
  getAll: 'getAll',
};