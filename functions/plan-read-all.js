/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");

exports.handler = async (event, context) => {
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   console.log("Function `plan-read-all` invoked");
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   return client
      .query(
         q.Map(
            q.Paginate(q.Match(q.Index("all_plan_entries_by_createDate")), {
               size: 100000,
            }),
            q.Lambda(["createDate", "ref"], q.Get(q.Var("ref")))
         )
      )
      .then((response) => {
         const planRefs = response.data;
         return {
            statusCode: 200,
            body: JSON.stringify(planRefs),
         };
      })
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
