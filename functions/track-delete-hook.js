/* eslint-disable no-unused-vars */
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const { getDBClient, q } = require("./utils/getDBClient");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

dayjs.extend(utc);

/**
 * 
 * @param {request} event 
 * {
    "id": "63904a5cdcc1c2108fa9ddf2",
    "description": "entri testing",
    "userId": "5f6c023d6bf23143e1a97822",
    "billable": true,
    "projectId": "6324815759f5e53cace5c06a",
    "timeInterval": {
        "start": "2022-12-07T08:10:02Z",
        "end": "2022-12-07T08:10:09Z",
        "duration": "PT7S"
    },
    "workspaceId": "5f6c023f6bf23143e1a9782e",
    "isLocked": false,
    "hourlyRate": null,
    "costRate": null,
    "customFieldValues": [],
    "type": "REGULAR",
    "kioskId": null,
    "currentlyRunning": false,
    "project": {
        "name": "sportsT",
        "clientId": "",
        "workspaceId": "5f6c023f6bf23143e1a9782e",
        "billable": true,
        "estimate": {
            "estimate": "PT0S",
            "type": "AUTO"
        },
        "color": "#FF5722",
        "archived": false,
        "clientName": "",
        "duration": "PT10H32M25S",
        "note": "",
        "activeEstimate": "NONE",
        "timeEstimate": {
            "includeNonBillable": true,
            "estimate": 0,
            "type": "AUTO",
            "resetOption": null
        },
        "budgetEstimate": null,
        "id": "6324815759f5e53cace5c06a",
        "public": true,
        "template": false
    },
    "task": null,
    "user": {
        "id": "5f6c023d6bf23143e1a97822",
        "name": "Pureworldnew",
        "status": "ACTIVE"
    },
    "tags": []
}
 * @param {*} context 
 * @returns 
 */

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   console.log("Function `track-delete-hook` invoked");
   const inputEntry = JSON.parse(event.body);
   try {
      const response = await getDBClient().query(
         q.Map(
            q.Paginate(
               q.Match(q.Index("track_search_by_timeEntryId"), inputEntry.id)
            ),
            q.Lambda("X", q.Delete(q.Var("X")))
         )
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
