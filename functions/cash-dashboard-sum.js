/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   /* parse the string body into a useable JS object */
   const data = JSON.parse(event.body);
   const date = new Date();
   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .split("T")[0];
   const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

   try {
      const response = await getDBClient().query(
         q.Sum(
            q.Map(
               q.Paginate(
                  q.Range(
                     q.Match(q.Index("all_cash_entries_by_date")),
                     q.Date(firstDay),
                     q.Date(lastDay)
                  )
               ),
               q.Lambda(
                  ["createDate", "cashValue", "ref"],
                  q.ToNumber(q.Var("cashValue"))
               )
            )
         )
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
