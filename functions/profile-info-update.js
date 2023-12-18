/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const getDBSecret = require("./utils/getDBSecret");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");

exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);

   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   console.log(
      "Function `profile-info-update` invoked",
      verifyStatus.resData,
      data
   );
   //
   const userId = verifyStatus.resData.user_id;
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   try {
      const { response } = await client.query(
         q.Update(q.Ref(`classes/user_entries/${userId}`), { data })
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
