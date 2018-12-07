const handleError = require('../../lib/utils/handleError');

const mockEvent = { queryStringParamters: '12345', paramater1: '1', paramter2: '2' };
const mockError = { detail1: '1', detail2: '2' };

describe('handleError', () => {
  let handled;
  beforeEach(() => {
    handled = handleError({
      statusCode: 418,
      message: 'Not for teapots!',
      event: mockEvent,
      errorDetails: mockError,
    });
  });

  it('reports a statusCode', () => {
    expect(handled.statusCode).toEqual(418);
  });

  describe('without a statusCode', () => {
    beforeEach(() => {
      handled = handleError({
        event: mockEvent,
        errorDetails: mockError,
      });
    });

    it('defaults to 422', () => {
      expect(handled.statusCode).toEqual(422);
    });
  });

  describe('the body', () => {
    it('exists', () => {
      expect(handled.body).toBeDefined();
    });

    it('has an error', () => {
      expect(JSON.parse(handled.body).errorDetails).toEqual(mockError);
    });

    it('has a default message if no error supplied', () => {
      handled = handleError({
        event: mockEvent,
      });

      expect(JSON.parse(handled.body).message).toEqual("We were unable to process this request. Please revise your request.");
    });

    it('has the event as "input"', () => {
      expect(JSON.parse(handled.body).input).toEqual(mockEvent);
    });
  });
});