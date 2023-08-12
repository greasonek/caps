# Lab 12

## Author: Emily Greason

## Setup

- Running the app
  - node server.index.js
  - node vendor-handler.js
  - node driver-handler.js

- Tests
  - npm test handler.test.js

- UML
![lab-12-UML](Screenshot%202023-08-09%20at%209.12.45%20PM.png)

### Functionality

- makes a new socket server and client socket connection
- creates a namespace for functions to listen to specific emits

### TO DO

- ~~namespace = caps~~
- rooms?
- **Global Event Pool (HUB)**
  - ~~configure socket objects from clients~~
  - ~~ensure sockets are connected to appropriate room~~
  - ~~configure global event pool every client socket should listen for:~~
    - ~~pickup - broadcasted to all~~
    - ~~in-transit - emitted to vendors (in right room)~~
    - ~~delivered - emitted to vendors (in right room)~~
      - create extra event allowing clients to join room
- **Vendor Client App**
  - ~~connect to CAPS app server using socket.io-client~~
    - ~~use storename 1-206-flowers to simulate vendor~~
  - ~~simulate new orders~~
    - ~~create payload object~~
    - ~~emit message to CAPS server for pickup~~
    - ~~setInterval()~~
  - ~~listen for delivered and console.log(thankyou for your order customer-name>)~~
- **Driver Application**
  - ~~listen for events from server: pickup - simulate all driver behaviors~~
  - ~~simulate and emit payloads upon receiving pickup event:~~
    - ~~in-transit log 'picking up payload.id'~~
    - ~~delivered - emit delivered event to CAPS server with payload~~
