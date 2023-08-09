'use strict';

const events = require('../modular/eventPool');

events.on('light', pupil);
events.on('light', squint);

function pupil(payload){
  console.log('eyes are dilated at', payload.brightness, '%');
};
function squint(payload){
  if(payload.brightness > 50) {
    console.log('we are squinting');
  };
};

setInterval(() => {
  console.log('---------');
  let brightness = Math.ceil(Math.random() * 100);
  events.emit('light', { event: 'light', brightness });
})