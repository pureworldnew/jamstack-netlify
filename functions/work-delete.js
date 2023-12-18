/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const getId = require("./utils/getId");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   const id = getId(event.path);
   try {
      const response = await getDBClient().query(
         q.Delete(q.Ref(`classes/work_entries/${id}`))
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, err);
   }
};
