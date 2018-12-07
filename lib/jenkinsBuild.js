const axios = require('axios');
const verifyTokenEvent = require('./utils/verifyTokenEvent');

const jenkinsBuild = ({
  username,
  password,
  authorizationToken,
  url,
  successMessage,
  failureMessage,
}) =>
  verifyTokenEvent(
    authorizationToken,
    () => axios.post(url, {}, { auth: { username, password } }),
    {
      success: successMessage,
      failure: failureMessage,
    }
  );

module.exports = jenkinsBuild;