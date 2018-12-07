'use strict';

const jenkinsBuild = require('./lib/jenkinsBuild');

const {
  JENKINS_API_KEY: password,
  JENKINS_USERNAME: username,
  AUTH_TOKEN: authorizationToken
} = process.env;

module.exports.campusmedia = jenkinsBuild({
  username,
  password,
  authorizationToken,
  url: "http://jenkins.library.nyu.edu/view/Campus%20Media/job/Campus%20Media%20Development%20Cron%20Deploy/build/api",
  successMessage: 'Campusmedia build successfully triggered.',
  failureMessage: 'Campusmedia job has not been built',
});
