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
   console.log("Function `track-delete-batch` invoked", data.ids);
   try {
      const deleteAllCompletedTrackQuery = data.ids.map((id) =>
         q.Delete(q.Ref(`classes/track_entries/${id}`))
      );
      const response = await getDBClient().query(deleteAllCompletedTrackQuery);
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
