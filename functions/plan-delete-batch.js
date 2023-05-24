/* eslint-disable no-unused-vars */
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
   console.log("Function `plan-delete-batch` invoked", data.ids);
   // construct batch query from IDs
   const deleteAllCompletedPlanQuery = data.ids.map((id) =>
      q.Delete(q.Ref(`classes/plan_entries/${id}`))
   );
   // Hit fauna with the query to delete the completed items
   return client
      .query(deleteAllCompletedPlanQuery)
      .then((response) => ({
         statusCode: 200,
         body: JSON.stringify(response),
      }))
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
