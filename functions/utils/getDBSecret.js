require("dotenv").config();

module.exports = function getDBSecret() {
   if (process.env.NODE_ENV === "development") {
      return process.env.FAUNADB_SERVER_SECRET;
   }
   if (process.env.NODE_ENV === "production") {
      return process.env.FAUNADB_SERVER_SECRET_ONLINE;
   }
   return process.env.FAUNADB_SERVER_SECRET;
};
