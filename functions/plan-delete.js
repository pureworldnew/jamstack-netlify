/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");
const getId = require("./utils/getId");
const getDBSecret = require("./utils/getDBSecret");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");

const q = faunadb.query;

exports.handler = async (event, context) => {
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   const id = getId(event.path);
   console.log(`Function 'plan-delete' invoked. delete id: ${id}`);
   return client
      .query(q.Delete(q.Ref(`classes/plan_entries/${id}`)))
      .then((response) => ({
         statusCode: 200,
         body: JSON.stringify(response),
      }))
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
