const axios = require('axios');

module.exports = ({ url, successMessage, authorizationToken, username, password }) =>
  async (event, context) => {
    const { token } = event.queryStringParameters ? event.queryStringParameters : {};

    if (token !== authorizationToken) {
      return handleError({ event, error: { message: "Invalid token."}, statusCode: 403 });
    }

    try {
      await axios.post(
        url, {}, // empty data
        {
          auth: {
            username,
            password,
        }
      });
    } catch(error) {
      return handleError({ event, error });
    }

    return handleSuccess(successMessage);
  };

function handleSuccess(message) {
  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
}

function handleError({ event, error, statusCode = 422, }) {
  return {
    statusCode,
    body: JSON.stringify({
      error: error.message,
      message: "We were unable to process this request. Please revise your request.",
      input: event,
    })
  };
}