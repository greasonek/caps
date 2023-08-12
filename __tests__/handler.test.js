'use strict';

const {
  startSocketServer,
  handleInTransit,
  handleDelivered,
  handlePickedUp,
  caps,
} = require('../CAPS-LAB/hub');

const events = require('../CAPS-LAB/clients/socket');

describe('Test the hub functionality', () => {
  test('Starts the socket server and logs that it can connect', () => {
    const mocklog = jest.spyOn(console, 'log');
    startSocketServer();
    expect(mocklog).toHaveBeenCalledWith('The server has been started');
  });
  test('handlePickedUp receives and emits a payload', () => {
    const payload = {
      orderId: 5,
    }
    const mockEmit = jest.spyOn(caps, 'emit');
    const mocklog = jest.spyOn(console, 'log');
    handlePickedUp(payload);
    expect(mockEmit).toHaveBeenCalledWith(events.pickedUp, expect.objectContaining({orderId: 5}));
    expect(mocklog).toHaveBeenCalledWith(`VENDOR: I see order ${payload.orderId} was picked up`);
  });
  test('handleInTransit receives and emits a payload', () => {
    const payload = {
      orderId: 5,
    }
    const mockEmit = jest.spyOn(caps, 'emit');
    const mocklog = jest.spyOn(console, 'log');
    handleInTransit(payload);
    expect(mocklog).toHaveBeenCalledWith('The order is in transit', payload.orderId);
    expect(mockEmit).toHaveBeenCalledWith(events.inTransit, expect.objectContaining({orderId: 5}));
  });
  test('handleDelivered receives and emits a payload', () => {
    const payload = {
      orderId: 5,
    }
    const mockEmit = jest.spyOn(caps, 'emit');
    const mocklog = jest.spyOn(console, 'log');
    handleDelivered(payload);
    expect(mocklog).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalled();
  });
});

