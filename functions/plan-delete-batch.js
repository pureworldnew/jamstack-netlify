/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const { sendResponse } = require("./utils/responseUtils");
const authenticate = require("./utils/authenticate");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   const data = JSON.parse(event.body);
   try {
      const deleteAllCompletedPlanQuery = data.ids.map((id) =>
         q.Delete(q.Ref(`classes/plan_entries/${id}`))
      );
      const response = await getDBClient().query(deleteAllCompletedPlanQuery);
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, err);
   }
};
