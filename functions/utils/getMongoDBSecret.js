require("dotenv").config();

module.exports = function getMongoDBSecret() {
   return process.env.MONGODB_CONNECTION_STR;
};
