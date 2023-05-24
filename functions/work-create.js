/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");
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
   console.log("Function `work-create` invoked", data);

   if (!Object.prototype.hasOwnProperty.call(data, "createDate")) {
      data.createDate = new Date().toISOString();
   } else {
      data.createDate = new Date(data.createDate).toISOString();
   }
   data.directCompany = data.directCompany.trim();
   const workItem = {
      data,
   };
   /* construct the fauna query */
   return client
      .query(q.Create(q.Collection("work_entries"), workItem))
      .then((response) =>
         /* Success! return the response with statusCode 200 */
         ({
            statusCode: 200,
            body: JSON.stringify(response),
         })
      )
      .catch((error) =>
         /* Error! return the error with statusCode 400 */
         ({
            statusCode: 400,
            body: JSON.stringify(error),
         })
      );
};
