/* eslint-disable no-unused-vars */
const getId = require("./utils/getId");
const { getDBClient, q } = require("./utils/getDBClient");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context, callback) => {
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   const data = JSON.parse(event.body);
   const id = getId(event.path);
   try {
      const { response } = await getDBClient().query(
         q.Update(q.Ref(`classes/plan_entries/${id}`), { data })
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(400, ("Something went wrong. Try again later.", err));
   }
};
