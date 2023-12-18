/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const getId = require("./utils/getId");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   const id = getId(event.path);
   try {
      const response = await getDBClient().query(
         q.Delete(q.Ref(`classes/plan_entries/${id}`))
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, ("Something went wrong. Try again later.", err));
   }
};
