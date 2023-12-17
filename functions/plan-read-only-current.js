/* eslint-disable no-unused-vars */

const faunadb = require("faunadb");

const q = faunadb.query;
const constants = require("./utils/constants");

const getDBSecret = require("./utils/getDBSecret");
const verifyToken = require("./utils/verifyToken");

exports.handler = async (event, context, callback) => {
   // Authorization with user role: user
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   try {
      /* configure faunaDB Client with our secret */
      console.log("FaunaDB fetching with fresh Data");
      const { data } = await client.query(
         q.Map(
            q.Paginate(
               q.Match(q.Index("all_plan_entries_by_planStatus"), "notFinished")
            ),
            q.Lambda(["createDate", "ref"], q.Get(q.Var("ref")))
         )
      );
      // after 1 seconds, expiring
      return {
         statusCode: 200,
         body: JSON.stringify(data),
      };
   } catch (err) {
      return {
         statusCode: 500,
         body: JSON.stringify("Something went wrong. Try again later.", err),
      };
   }
};
