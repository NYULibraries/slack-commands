'use strict';

const axios = require('axios');

module.exports.campusmedia = async (event, context) => {
  const { JENKINS_API_KEY, JENKINS_USERNAME, CAMPUSMEDIA_TOKEN } = process.env;

  const response = await axios.get(`http://jenkins.library.nyu.edu:8080/view/Campus%20Media/job/Campus%20Media%20Development%20Cron/build?token=${CAMPUSMEDIA_TOKEN}`, {
    auth: {
      username: JENKINS_USERNAME,
      password: JENKINS_API_KEY
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response.data,
      input: event,
    }),
  };
};
