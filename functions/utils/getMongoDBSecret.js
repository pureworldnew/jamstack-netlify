require("dotenv").config();

module.exports = function getMongoDBSecret() {
   if (process.env.NODE_ENV === "development") {
      return process.env.MONGODB_CONNECTION_STR_LOCAL;
   }
   if (process.env.NODE_ENV === "production") {
      return process.env.MONGODB_CONNECTION_STR;
   }
   return 0;
};
