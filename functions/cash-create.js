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
   if (!Object.prototype.hasOwnProperty.call(data, "createDate")) {
      const [one] = new Date().toISOString().split("T");
      data.createDate = one;
   }

   console.log("Function `cash-create` invoked", data);
   data.createDate = q.Date(data.createDate.split("T")[0]);
   const cashItem = {
      data,
   };
   console.log("cashItem is ", cashItem);
   /* construct the fauna query */
   return client
      .query(q.Create(q.Collection("cash_entries"), cashItem))
      .then((response) => {
         console.log("cash_entries insertsuccess", response);
         /* Success! return the response with statusCode 200 */
         return {
            statusCode: 200,
            body: JSON.stringify(response),
         };
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
