// can test for console.logs
// can test that an emit function was called

const {
  startSocketServer,
  handleInTranist,
  handleDelivered,
  io, 
  caps,
} = require('./hub');
const events = require('./utility');

describe('test the hub functionality', () => {
  test('starts the socket server and logs it connects', () => {
    const mocklog = jest.spyOn(console, 'log');
    startSocketServer();
    expect(mocklog).toHaveBeenCalledWith('The server has been started');
  });
  test('handleInTransit receives a payload and emits the payload', () => {
    const payload = {
      orderId: 5,
    }
    const mockEmit = jest.spyOn(caps, 'emit');
    const mocklog = jest.spyOn(console, 'log');
    handleInTranist(payload);
    expect(mocklog).toHaveBeenCalledWith('the package is in transit', payload.orderId);
    expect(mockEmit).toHaveBeenCalledWith(events.inTransit, expect.objectContaining({ orderId: 5 }));
  });
  test('handleDelivered ')
  io.close();
})