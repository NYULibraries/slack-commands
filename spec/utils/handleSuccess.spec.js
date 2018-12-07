const handleSuccess = require('../../lib/utils/handleSuccess');

describe('handleSuccess', () => {
  let handled;
  beforeEach(() => {
    handled = handleSuccess('Success!');
  });

  it('should have a 200 statusCode', () => {
    expect(handled.statusCode).toEqual(200);
  });

  it('should have a body with a message', () => {
    expect(handled.body).toEqual(JSON.stringify({ message: 'Success!' }));
  });
});