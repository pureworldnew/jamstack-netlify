/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = (event, context) => {
   console.log("Function `track-read-all` invoked", event);
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   return client
      .query(
         q.Map(
            q.Paginate(q.Match(q.Index("track_sort_by_end")), { size: 100000 }),
            q.Lambda(["endDateTime", "timeEntryId", "ref"], q.Get(q.Var("ref")))
         )
      )
      .then((response) => ({
         statusCode: 200,
         body: JSON.stringify(response.data),
      }))
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
