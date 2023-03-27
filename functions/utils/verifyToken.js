const jwt = require("jsonwebtoken");

const config = process.env;

module.exports = function verifyToken(token) {
   if (!token) {
      return false;
   }
   try {
      const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
      return decoded;
   } catch (err) {
      console.log("err for decoding", err);
      return false;
   }
};
