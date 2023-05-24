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

   console.log("Function `cash-dashbaord-sum` invoked", data.dateMonth);
   const date = new Date();
   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .split("T")[0];
   const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

   /* construct the fauna query */
   return client
      .query(
         q.Sum(
            q.Map(
               q.Paginate(
                  q.Range(
                     q.Match(q.Index("all_cash_entries_by_date")),
                     q.Date(firstDay),
                     q.Date(lastDay)
                  )
               ),
               q.Lambda(
                  ["createDate", "cashValue", "ref"],
                  q.ToNumber(q.Var("cashValue"))
               )
            )
         )
      )
      .then((response) =>
         /* Success! return the response with statusCode 200 */
         ({
            statusCode: 200,
            body: JSON.stringify(response),
         })
      )
      .catch((error) => {
         console.log("error", error);
         /* Error! return the error with statusCode 400 */
         return {
            statusCode: 400,
            body: JSON.stringify(error),
         };
      });
};
