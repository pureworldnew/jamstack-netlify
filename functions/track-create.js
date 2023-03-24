/* Import faunaDB sdk */
const faunadb = require("faunadb");
const getDBSecret = require("./utils/getDBSecret");
const multiUpsert = require("./utils/multiUpsert");
const deleteAll = require("./utils/deleteAll");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   /* parse the string body into a useable JS object */
   const data = JSON.parse(event.body);

   console.log("Function `clockify-create` invoked", data);

   /* construct the fauna query */
   return client
      .query(deleteAll())
      .then((response) => {
         console.log("success in deleting existing track_entires", response);
         return client.query(multiUpsert(data)).then((res) =>
            /* Success! return the response with statusCode 200 */
            ({
               statusCode: 200,
               body: JSON.stringify(res),
            })
         );
      })
      .catch((error) => {
         console.log("error", error);
         /* Error! return the error with statusCode 400 */
         return {
            statusCode: 400,
            body: JSON.stringify(error),
         };
      });
};
