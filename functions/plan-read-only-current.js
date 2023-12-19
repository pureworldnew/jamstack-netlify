/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context, callback) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(
               q.Match(q.Index("all_plan_entries_by_planStatus"), "notFinished")
            ),
            q.Lambda(["createDate", "ref"], q.Get(q.Var("ref")))
         )
      );
      return sendResponse(200, response.data);
   } catch (err) {
      return sendResponse(500, ("Something went wrong. Try again later.", err));
   }
};
