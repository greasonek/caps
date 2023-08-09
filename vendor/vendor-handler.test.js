'use strict';

const driverHandler = require('../driver/driver-handler');
const payload = {
  data: {
    store: 'Oddities n Such',
    orderId: '5',
    customer: 'Emily',
    address: 'Olympia WA'
  },
};

describe('Are the events calling the functions?', () => {
  it('should call driverHandler function', () => {
    const spy = jest.spyOn(console, 'log');
    driverHandler(payload);
    expect(spy).toHaveBeenCalled();
  });
});