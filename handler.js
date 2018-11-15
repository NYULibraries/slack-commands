'use strict';

const jenkinsBuild = require('./lib/jenkinsBuild');

const { JENKINS_API_KEY, JENKINS_USERNAME, AUTH_TOKEN } = process.env;
const credentials = {
  username: JENKINS_USERNAME,
  password: JENKINS_API_KEY,
  authorizationToken: AUTH_TOKEN
};

module.exports.campusmedia = jenkinsBuild({
  ...credentials,
  successMessage: 'Campusmedia build successfully triggered.',
  url: "http://jenkins.library.nyu.edu/view/Campus%20Media/job/Campus%20Media%20Development%20Cron%20Deploy/build/api"
});
