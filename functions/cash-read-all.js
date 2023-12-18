/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   console.log("Function `cash-read-all` invoked");
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(q.Documents(q.Collection("cash_entries"))),
            q.Lambda((x) => q.Get(x))
         )
      );
      const cashRefs = response.data;
      const newCashRefs = cashRefs.map((each) => {
         const modifiedEach = { ...each };
         modifiedEach.data.createDate = JSON.parse(
            JSON.stringify(each.data.createDate)
         )["@date"];
         return modifiedEach;
      });
      return sendResponse(200, newCashRefs);
   } catch (err) {
      return sendResponse(400, err);
   }
};
