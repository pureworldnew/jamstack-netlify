
const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = async (event, context) => {
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   console.log("Function `auth-signin` invoked", JSON.parse(event.body));
   return {
      statusCode: 200,
      body: "test auth logout",
   };
}