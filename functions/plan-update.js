/* eslint-disable no-unused-vars */
const faunadb = require("faunadb");
const getId = require("./utils/getId");
const getDBSecret = require("./utils/getDBSecret");

const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");

const q = faunadb.query;

exports.handler = async (event, context, callback) => {
   // Authorization with user role: user
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
   const data = JSON.parse(event.body);
   const id = getId(event.path);
   console.log(
      `Function 'plan-update' invoked. update id: ${id}, data: ${JSON.stringify(
         data
      )}`
   );
   try {
      const { response } = await client.query(
         q.Update(q.Ref(`classes/plan_entries/${id}`), { data })
      );
      return {
         statusCode: 200,
         body: JSON.stringify(response),
      };
   } catch (err) {
      return {
         statusCode: 400,
         body: JSON.stringify("Something went wrong. Try again later.", err),
      };
   }
};
