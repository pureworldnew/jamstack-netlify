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

   if (!Object.prototype.hasOwnProperty.call(data, "createDate")) {
      data.createDate = new Date().toISOString();
   } else {
      data.createDate = new Date(data.createDate).toISOString();
   }
   data.directCompany = data.directCompany.trim();
   const workItem = {
      data,
   };
   try {
      const response = await getDBClient().query(
         q.Create(q.Collection("work_entries"), workItem)
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, err);
   }
};
