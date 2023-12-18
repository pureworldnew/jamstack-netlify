/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   console.log("Function `profile-read-all` invoked");

   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("user_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      );
      console.log("response of profile read all", response);
      return sendResponse(200, response.data);
   } catch (err) {
      return sendResponse(500, err);
   }
};
