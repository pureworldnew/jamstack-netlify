const verifyToken = require("./verifyToken");
const constants = require("./constants");

module.exports = function authenticate(event, role = constants.USER_ROLE) {
   return verifyToken(event, role);
};
