/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const { sendResponse } = require("./utils/responseUtils");
const authenticate = require("./utils/authenticate");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
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
      return sendResponse(500, err);
   }
};
