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
      const [one] = new Date().toISOString().split("T");
      data.createDate = one;
   }
   data.createDate = q.Date(data.createDate.split("T")[0]);
   const cashItem = {
      data,
   };
   try {
      const response = await getDBClient().query(
         q.Create(q.Collection("cash_entries"), cashItem)
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, err);
   }
};
