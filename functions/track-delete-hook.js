/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const getDBSecret = require("./utils/getDBSecret");

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
   /* configure faunaDB Client with our secret */
   const client = new faunadb.Client({
      secret: getDBSecret(),
      domain: "db.us.fauna.com",
      scheme: "https",
   });
   console.log("Function `track-delete-hook` invoked");
   const inputEntry = JSON.parse(event.body);

   return client
      .query(
         q.Map(
            q.Paginate(
               q.Match(q.Index("track_search_by_timeEntryId"), inputEntry.id)
            ),
            q.Lambda("X", q.Delete(q.Var("X")))
         )
      )
      .then((response) =>
         //
         /* Success! return the response with statusCode 200 */
         ({
            statusCode: 200,
            body: JSON.stringify(response),
         })
      )
      .catch((error) =>
         /* Error! return the error with statusCode 400 */
         ({
            statusCode: 400,
            body: JSON.stringify(error),
         })
      );
};
