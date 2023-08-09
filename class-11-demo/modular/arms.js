'use strict';

const events = require('../modular/eventPool');

events.on('light', coverEyes);
events.on('itch', scratch);

function coverEyes(payload){
  if(payload.brightness >= 90){
    console.log('covering our eyes');
  }
}

function scratch(payload){
  console.log('scratching itch', payload.location);
}