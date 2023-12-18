/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   const data = JSON.parse(event.body);
   try {
      const deleteAllCompletedStressQuery = data.ids.map((id) =>
         q.Delete(q.Ref(`classes/stress_entries/${id}`))
      );
      const response = await getDBClient().query(deleteAllCompletedStressQuery);
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
