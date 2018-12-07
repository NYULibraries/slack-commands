describe('jenkinsBuild', () => {
  const { AUTH_TOKEN: authorizationToken } = require('./helpers/loadEnv');
  const credentials = {
    url: 'http://www.example.com',
    username: 'usr123',
    password: 'starwars',
  };

  let jenkinsBuild, lambdaHandler, axios;
  beforeEach(() => {
    axios = require('axios');
    spyOn(axios, 'post');

    jenkinsBuild = require('../lib/jenkinsBuild');
    lambdaHandler = jenkinsBuild({
      ...credentials,
      successMessage: 'Success!',
      failureMessage: 'Failure!',
      authorizationToken,
    });
  });

  it('returns a function', () => {
    expect(typeof(lambdaHandler)).toEqual('function');
  });

  describe('when invoked with a valid token', () => {
    let response;
    beforeEach(async () => {
      response = await lambdaHandler({
        queryStringParameters: {
          token: authorizationToken,
        }
      });
    });

    it('invokes axios.post', () => {
      expect(axios.post).toHaveBeenCalled();
    });

    it('invokes with the url & auth header', () => {
      expect(axios.post).toHaveBeenCalledWith(
        credentials.url,
        {},
        { auth: { username: credentials.username, password: credentials.password } }
      );
    });

    it('returns a success code', () => {
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('when invoked with invalid token', () => {
    let response;
    beforeEach(async () => {
      response = await lambdaHandler({
        queryStringParameters: {
          token: 'bad_token',
        }
      });
    });

    it('does not post', () => {
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('returns a 403', () => {
      expect(response.statusCode).toEqual(403);
    });
  });

  describe('when post rejects', () => {
    const mockError = {
      status: 418,
      response: {
        message: 'problem from the server'
      }
    };

    const event = {
      queryStringParameters: {
        token: authorizationToken
      }
    };

    let response;
    beforeEach(async () => {
      axios.post.and.returnValue(
        Promise.reject(mockError)
      );

      response = await lambdaHandler(event);
    });

    it('has the rejection statusCode', () => {
      expect(response.statusCode).toEqual(418);
    });

    describe('response body', () => {
      let responseBody;
      beforeEach(() => {
        responseBody = JSON.parse(response.body);
      });

      it('has custom failure message in body', () => {
        expect(responseBody.message).toEqual('Failure!');
      });

      it('has errorDetails in body', () => {
        expect(responseBody.errorDetails).toEqual(mockError);
      });

      it('has event details in body', () => {
        expect(responseBody.input).toEqual(event);
      });
    });
  });
});