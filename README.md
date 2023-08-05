# Lab 11

## Author: Emily Greason

## Setup

- .env requirements
  - PORT - 3001``

- Running the app
  - npm start

- Tests
  - unit tests: npm run test

- UML

### Class Notes

- Registering (or 'subscribing') events

- events.on('foobar', dooFoo); // dooFoo references the function

function doofoo(){...};

- somewhere in memory:
event: foobar
action: dooFoo()

### Q's
1. implementing storename as a parameter for the vendor module
2. establishing a payload
3. listening for an event emitted by driver and responding?
4. logging timestamp
