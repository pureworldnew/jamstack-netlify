/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   console.log("Function `track-read-all` invoked");
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(q.Match(q.Index("track_sort_by_end")), { size: 100000 }),
            q.Lambda(["endDateTime", "timeEntryId", "ref"], q.Get(q.Var("ref")))
         )
      );
      return sendResponse(200, response.data);
   } catch (err) {
      return sendResponse(500, err);
   }
};
