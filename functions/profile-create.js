/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const { getDBClient, q } = require("./utils/getDBClient");
const { sendResponse } = require("./utils/responseUtils");
const authenticate = require("./utils/authenticate");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   const data = JSON.parse(event.body);
   const profileItem = {
      data,
   };
   try {
      const response = await getDBClient().query(
         q.Create(q.Collection("user_entries"), profileItem)
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, err);
   }
};
