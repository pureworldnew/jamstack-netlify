/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("stress_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
