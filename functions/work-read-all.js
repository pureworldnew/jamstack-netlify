/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   console.log("Function `work-read-all` invoked");
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(q.Match(q.Index("work_entries_sort_by_create_desc")), {
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
