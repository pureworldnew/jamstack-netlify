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
   console.log("Function `profile-get` invoked", verifyStatus.resData);
   //
   const userId = verifyStatus.resData.user_id;
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   return client
      .query(q.Get(q.Ref(q.Collection("user_entries"), userId)))
      .then((response) => {
         const userInfo = response.data;
         return {
            statusCode: 200,
            body: JSON.stringify(userInfo),
         };
      })
      .catch((error) => ({
         statusCode: 400,
         body: JSON.stringify(error),
      }));
};
