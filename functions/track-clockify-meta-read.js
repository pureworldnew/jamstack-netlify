/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

const handler = async (event, context) => {
   console.log("Function `track-clockify-meta-read` invoked", event.path);
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   try {
      const { data } = await getDBClient().query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("clockify_meta_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      );
      return sendResponse(200, data);
   } catch (err) {
      return sendResponse(500, err);
   }
};

module.exports.handler = handler;
