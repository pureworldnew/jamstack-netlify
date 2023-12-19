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
   const data = JSON.parse(event.body);
   if (!Object.prototype.hasOwnProperty.call(data, "createDate")) {
      data.createDate = new Date().toISOString();
   } else {
      data.createDate = new Date(data.createDate).toISOString();
   }
   try {
      const response = await getDBClient().query(
         q.Update(q.Ref(`classes/work_entries/${id}`), { data })
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
