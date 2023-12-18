/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const constants = require("./utils/constants");
const verifyToken = require("./utils/verifyToken");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context, callback) => {
   const verifyStatus = verifyToken(event, constants.USER_ROLE);
   if (!verifyStatus.status) {
      return verifyStatus.resData;
   }
   try {
      const { data } = await getDBClient().query(
         q.Map(
            q.Paginate(
               q.Match(q.Index("all_plan_entries_by_planStatus"), "notFinished")
            ),
            q.Lambda(["createDate", "ref"], q.Get(q.Var("ref")))
         )
      );
      return sendResponse(200, data);
   } catch (err) {
      return sendResponse(500, ("Something went wrong. Try again later.", err));
   }
};
