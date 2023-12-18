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
   if (!Object.prototype.hasOwnProperty.call(data, "stressStartDate")) {
      data.stressStartDate = new Date().toLocaleDateString();
   }
   if (!Object.prototype.hasOwnProperty.call(data, "stressEndDate")) {
      data.stressEndDate = new Date().toLocaleDateString();
   }
   console.log("Function `stress-create` invoked", data);
   const stressItem = {
      data,
   };
   try {
      const response = await getDBClient().query(
         q.Create(q.Collection("stress_entries"), stressItem)
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
