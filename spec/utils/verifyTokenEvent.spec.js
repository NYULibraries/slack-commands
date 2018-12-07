const { AUTH_TOKEN } = require('../helpers/loadEnv');
const verifyTokenEvent = require('../../lib/utils/verifyTokenEvent');

describe('verifyTokenEvent', () => {

  let verifyTokenFunction, callback;
  beforeEach(() => {
    callback = jasmine.createSpy('callback');
    const authorizationToken = AUTH_TOKEN;
    const success = 'Verification success!';
    const failure = 'Verification failed!';

    verifyTokenFunction = verifyTokenEvent(authorizationToken, callback, { success, failure });
  });

  describe('if token matches', () => {
    let response;
    beforeEach(async () => {
      response = await verifyTokenFunction({
        queryStringParameters: {
          token: AUTH_TOKEN,
        }
      });
    });

    it('executes callback if token matches process.env.AUTH_TOKEN', async () => {
      expect(callback).toHaveBeenCalled();
    });

    it('returns a success message', () => {
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('if token doesn\'t match', () => {
    let response;
    beforeEach(async () => {
      response = await verifyTokenFunction({
        queryStringParameters: {
          token: 'BAD_TOKEN',
        }
      });
    });

    it('does not execute callback', () => {
      expect(callback).not.toHaveBeenCalled();
    });

    it('returns a 403', () => {
      expect(response.statusCode).toEqual(403);
    });

    it('returns a message in the body', () => {
      expect(JSON.parse(response.body).message).toEqual('Token supplied in query string does not match the service credentials');
    });
  });

  describe('without a token', () => {
    let response;
    beforeEach(async () => {
      response = await verifyTokenFunction({});
    });

    it('does not execute callback', () => {
      expect(callback).not.toHaveBeenCalled();
    });

    it('returns a 403', () => {
      expect(response.statusCode).toEqual(403);
    });

    it('returns a message in the body', () => {
      expect(JSON.parse(response.body).message).toEqual('Token supplied in query string does not match the service credentials');
    });
  });
});
