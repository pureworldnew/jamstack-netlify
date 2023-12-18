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
   if (!Object.prototype.hasOwnProperty.call(data, "createDate")) {
      data.createDate = new Date().toISOString();
   }
   if (!Object.prototype.hasOwnProperty.call(data, "finishedDate")) {
      data.finishedDate = new Date().toISOString();
   }
   const planItem = {
      data,
   };
   try {
      const response = getDBClient().query(
         q.Create(q.Collection("plan_entries"), planItem)
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, ("Something went wrong. Try again later.", err));
   }
};
