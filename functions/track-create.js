/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

const multiUpsert = require("./utils/multiUpsert");
const deleteAll = require("./utils/deleteAll");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   /* parse the string body into a useable JS object */
   const data = JSON.parse(event.body);

   console.log("Function `clockify-create` invoked", data);

   try {
      const response = await getDBClient().query(deleteAll());
      const res = await getDBClient().query(multiUpsert(data.data));
      return sendResponse(200, res);
   } catch (err) {
      return sendResponse(500, err);
   }
};
