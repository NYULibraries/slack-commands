const handleError = require('./handleError');
const handleSuccess = require('./handleSuccess');

const verifyTokenEvent = (authorizationToken, callback, { success: callbackSuccess, failure: callbackFailure }) =>
  async (event, context, handlerCallback) => {
    const { token } = event.queryStringParameters || {};

    if (token !== authorizationToken) {
      return handleError({
        statusCode: 403,
        message: 'Token supplied in query string does not match the service credentials',
        event,
      });
    }

    try {
      await callback();
    } catch(error) {
      return handleError({
        statusCode: error.status,
        message: callbackFailure,
        errorDetails: error,
        event,
      });
    }

    return handleSuccess(callbackSuccess);
  };

module.exports = verifyTokenEvent;