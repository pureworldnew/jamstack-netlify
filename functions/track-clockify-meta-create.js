/* eslint-disable no-unused-vars */
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   const data = JSON.parse(event.body);
   const clockifyMetaItem = {
      data,
   };

   try {
      const response = await getDBClient().query(
         q.Let(
            {
               match: q.Match(
                  q.Index("all_clockify_meta_entries"),
                  data.workspaceId
               ),
               data: clockifyMetaItem,
            },
            q.If(
               q.Exists(q.Var("match")),
               q.Update(q.Select("ref", q.Get(q.Var("match"))), q.Var("data")),
               q.Create(q.Collection("clockify_meta_entries"), q.Var("data"))
            )
         )
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
