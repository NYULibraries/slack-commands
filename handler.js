'use strict';

const axios = require('axios');

module.exports.campusmedia = async (event, context) => {
  const { JENKINS_API_KEY, JENKINS_USERNAME, AUTH_TOKEN } = process.env;
  const { token } = event.queryStringParameters;

  if (token !== AUTH_TOKEN) {
    return handleError({ event, error: "Invalid token.", statusCode: 403 });
  }

  let response;
  try {
    response = await axios.post(
      `http://jenkins.library.nyu.edu/view/Campus%20Media/job/Campus%20Media%20Development%20Cron%Deploy/build/api`,
      {}, // empty data
      {
        auth: {
          username: JENKINS_USERNAME,
          password: JENKINS_API_KEY
      }
    });
  } catch(error) {
    return handleError({ event, error });
  }

  return handleSuccess({ response, message: 'Campusmedia build trigger was successful' });
};

function handleSuccess(successObj) {
  return {
    statusCode: 200,
    body: JSON.stringify(successObj),
  };
}

function handleError({ event, error, statusCode = 422, }) {
  console.error(error);

  return {
    statusCode,
    body: JSON.stringify({
      message: "We were unable to process this request. Please revise your request.",
      input: event,
      error,
    })
  };
}
