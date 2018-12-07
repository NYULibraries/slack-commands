const handleError = ({ statusCode = 422, message, event, errorDetails = {} }) => {
  return {
    statusCode,
    body: JSON.stringify({
      message: message || "We were unable to process this request. Please revise your request.",
      errorDetails,
      input: event,
    })
  };
}

module.exports = handleError;