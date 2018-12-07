const handleSuccess = (message) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message,
    })
  };
};

module.exports = handleSuccess;