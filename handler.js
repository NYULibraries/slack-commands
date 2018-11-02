'use strict';

const axios = require('axios');

module.exports.campusmedia = async (event, context) => {
  const { JENKINS_API_KEY, JENKINS_USERNAME } = process.env;

  const { token } = event.queryStringParameters;

  let response;
  try {
    response = await axios.get(
      `http://jenkins.library.nyu.edu:8080/view/Campus%20Media/job/Campus%20Media%20Development%20Cron/build?token=${token}`,
      {
        auth: {
          username: JENKINS_USERNAME,
          password: JENKINS_API_KEY
      }
    });
  } catch(error) {
    handleError({ event, error });
  }

  handleSuccess({ response, message: 'Campusmedia build trigger was successful' });
};

function handleSuccess(successObj) {
  return {
    statusCode: 200,
    body: JSON.stringify(successObj),
  };
}

function handleError({ event, error }) {
  console.error(error);

  return {
    statusCode: 422,
    body: JSON.stringify({
      message: "We were unable to process this request. Please revise your request.",
      input: event,
      error,
    })
  };
}
