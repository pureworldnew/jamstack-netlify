const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./getDBSecret");

function getDBClient() {
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   return client;
}

module.exports = {
   getDBClient,
   q,
};
