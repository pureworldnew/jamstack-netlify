require("dotenv").config();

module.exports = function getDBSecret() {
   return process.env.FAUNADB_SERVER_SECRET;
};
