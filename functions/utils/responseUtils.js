function sendResponse(statusCode, data) {
   return {
      statusCode,
      body: JSON.stringify(data),
   };
}

module.exports = {
   sendResponse,
};
