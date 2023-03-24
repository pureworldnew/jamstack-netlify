/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = async (event, context) => {
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   const data = JSON.parse(event.body);
   console.log("Function `auth-signin` invoked", data);

   return client
      .query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("cash_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      )
      .then((response) => {})
      .catch((error) => {
         console.log("error", error);
         return {
            statusCode: 400,
            body: JSON.stringify(error),
         };
      });
};
