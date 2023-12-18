/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);
   try {
      const deleteAllCompletedPlanQuery = data.ids.map((id) =>
         q.Delete(q.Ref(`classes/plan_entries/${id}`))
      );
      const response = getDBClient().query(deleteAllCompletedPlanQuery);
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, err);
   }
};
