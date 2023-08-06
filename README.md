# Lab 11

## Author: Emily Greason

## Setup

- Running the app
  - node hub.js

- Tests

- UML
![lab-11-UML](Screenshot%202023-08-05%20at%205.10.19%20PM.png)

### Functionality

- Driver is listening for the pick up function to let them know the order is ready to pick up so the listener function goes into the driver handler with event.on; the event is emmitted in the vendor handler
- Vendor is listening for the order being picked up, in transit and delivered so all of those functions go into the vendor handler and are emmitted in the driver handler because the driver is emitting those functions.

### Class Notes

- Registering (or 'subscribing') events

- events.on('foobar', dooFoo); // dooFoo references the function

function doofoo(){...};

- somewhere in memory:
event: foobar
action: dooFoo()
