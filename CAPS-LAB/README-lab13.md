# LAB 13 - MESSAGING QUEUES

## Author: Emily Greason

## Setup

- Running the app
  - node server.index.js
  - node vendor-handler.js
  - node driver-handler.js

- Tests
  - npm test handler.test.js

- UML
![lab-13-UML](/Screenshot%202023-08-14%20at%205.24.43%20PM.png)

### CLASS 13 NOTES

- use the chance library to create random orders
const chance = require('chance')();

- can download concurrently as an option to run all events in the same terminal
- to create 2+ drivers, run two different terminal windows and run node driver.handler.js in each window -> they'll each have their own socket instance
- do the same thing for vendors if you want 2+ vendors
- changing pickup function so will need to fix some tests that utilize the pickup function
- pickup test

- on getAll --> hsave socket based on store --> ub checks the vendor queue, sends any orders in the queue and clears it out

- vendor emits pickup and send the order, hub on pickup emits pickup, on pick up, driver emits in transit

- on delivered, hub emits delivered, when vendor receives delivered, emits received

### TO DO

- pick up ready event payload should be added to queue for drivers
- delivered event payload should be added to queue for vendors
- add received event to global event pool (should include client id, event name, message id)
- add getAll event, payload should include client id and event name
- refactor delivered, pickup and in-transit to add payloads to the appropriate queue - payload event should correspond with pickup or delivered

- create another store for vendors that subscribes to diff queues than flowers
- on startup, should trigger getAll event that fetches all messages from server in the vendor queue - trigger received event with correct payload to the server
- subscribe to delivered Queue and log confirmation with order id and payload

- make sure driver is subscribed to appropriate vendor queues
- driver can fetch messages added to their queues