const env = {
  "AUTH_TOKEN": "dGhpc2lzYXRlc3RzdHJpbmc",
  "JENKINS_API_KEY": "amVua2luc2FwaXRva2Vu",
  "JENKINS_USERNAME": "abc123"
};

Object.keys(env).forEach(k => process.env[k] = env[k]);

module.exports = env;