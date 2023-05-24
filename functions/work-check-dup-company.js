/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");
const getId = require("./utils/getId");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");

exports.handler = (event, context) => {
   const companyName = getId(event.path);
   console.log("Function `work-check-dup-company` invoked", companyName);

   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   return client
      .query(
         q.Map(
            q.Paginate(q.Match(q.Index("all_work_entries"), companyName)),
            q.Lambda("res", q.Get(q.Var("res")))
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
