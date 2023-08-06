'use strict';
// registring an event listerner...
//"subscribe to the light event"

const events = require('../modular/eventPool');

events.on('light', logIt);
events.on('itch', logIt);


function logIt(data) {
  console.log(data);
};
