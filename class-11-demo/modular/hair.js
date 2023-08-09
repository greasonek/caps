'use strict';

const events = require('./eventPool');


events.on('light', gooseBumps);

function gooseBumps(){
  console.log('hair is standing up');
}
