/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(q.Match(q.Index("all_plan_entries_by_createDate")), {
               size: 100000,
            }),
            q.Lambda(["createDate", "ref"], q.Get(q.Var("ref")))
         )
      );
      return sendResponse(200, response.data);
   } catch (err) {
      return sendResponse(400, err);
   }
};
