/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = (event, context) => {
   console.log("Function `cash-read-all` invoked");
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   return client
      .query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("cash_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      )
      .then((response) => {
         const cashRefs = response.data;
         const newCashRefs = cashRefs.map((each) => {
            const modifiedEach = { ...each };
            modifiedEach.data.createDate = JSON.parse(
               JSON.stringify(each.data.createDate)
            )["@date"];
            return modifiedEach;
         });

         return {
            statusCode: 200,
            body: JSON.stringify(newCashRefs),
         };
      })
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
