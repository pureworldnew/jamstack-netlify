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
      "id": "6386ba8ebf21f2037287906e",
      "description": "test hook",
      "userId": "5f6c023d6bf23143e1a97822",
      "billable": true,
      "projectId": "63247a7eb5edfe7856eae093",
      "timeInterval": {
          "start": "2022-11-30T02:06:04Z",
          "end": "2022-11-30T02:06:20Z",
          "duration": "PT16S"
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
          "name": "languageT",
          "clientId": "",
          "workspaceId": "5f6c023f6bf23143e1a9782e",
          "billable": true,
          "estimate": {
              "estimate": "PT0S",
              "type": "AUTO"
          },
          "color": "#8BC34A",
          "archived": false,
          "clientName": "",
          "duration": "PT2H9M23S",
          "note": "",
          "activeEstimate": "NONE",
          "timeEstimate": {
              "includeNonBillable": true,
              "estimate": 0,
              "type": "AUTO",
              "resetOption": null
          },
          "budgetEstimate": null,
          "id": "63247a7eb5edfe7856eae093",
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
/**
 * 
 * @param {*} event 
 * {
    "billable": true,
    "costRate": null,
    "currentlyRunning": false,
    "customFieldValues": [
    ],
    "description": "manual time entry testing",
    "hourlyRate": null,
    "id": "6390489cdcc1c2108fa9db0e",
    "isLocked": false,
    "kioskId": null,
    "project": {
        "activeEstimate": "NONE",
        "archived": false,
        "billable": true,
        "budgetEstimate": null,
        "clientId": "",
        "clientName": "",
        "color": "#8BC34A",
        "duration": "PT6H15M47S",
        "estimate": {
            "estimate": "PT0S",
            "type": "AUTO"
        },
        "id": "63247a7eb5edfe7856eae093",
        "name": "languageT",
        "note": "",
        "public": true,
        "template": false,
        "timeEstimate": {
            "estimate": 0,
            "includeNonBillable": true,
            "resetOption": null,
            "type": "AUTO"
        },
        "workspaceId": "5f6c023f6bf23143e1a9782e"
    },
    "projectId": "63247a7eb5edfe7856eae093",
    "tags": [
    ],
    "task": null,
    "timeInterval": {
        "duration": "PT5S",
        "end": "2022-12-07T08:02:39Z",
        "start": "2022-12-07T08:02:34Z"
    },
    "type": "REGULAR",
    "user": {
        "id": "5f6c023d6bf23143e1a97822",
        "name": "Pureworldnew",
        "status": "ACTIVE"
    },
    "userId": "5f6c023d6bf23143e1a97822",
    "workspaceId": "5f6c023f6bf23143e1a9782e"
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
   console.log("Function `track-update-hook` invoked");
   const inputEntry = JSON.parse(event.body);

   const startDateString = dayjs(inputEntry.timeInterval.start)
      .utcOffset(-6)
      .format("YYYY-MM-DD");

   const endDateString = dayjs(inputEntry.timeInterval.end)
      .utcOffset(-6)
      .format("YYYY-MM-DD");
   const chartStatusData = [];
   if (startDateString === endDateString) {
      chartStatusData.push({
         trackCreateDate: startDateString,
         duration: dayjs(inputEntry.timeInterval.end)
            .diff(dayjs(inputEntry.timeInterval.start), "m", true)
            .toFixed(2),
         projectName: inputEntry.project.name,
      });
   } else {
      chartStatusData.push({
         trackCreateDate: startDateString,
         duration: dayjs(dayjs(startDateString).add(1, "day"))
            .diff(dayjs(inputEntry.timeInterval.start), "m", true)
            .toFixed(2),
         projectName: inputEntry.project.name,
      });
      chartStatusData.push({
         trackCreateDate: endDateString,
         duration: dayjs(inputEntry.timeInterval.end)
            .diff(dayjs(endDateString), "m", true)
            .toFixed(2),
         projectName: inputEntry.project.name,
      });
   }

   return client
      .query(
         q.Map(
            q.Paginate(
               q.Match(q.Index("track_search_by_timeEntryId"), inputEntry.id)
            ),
            q.Lambda(
               "X",
               q.Replace(q.Var("X"), {
                  data: {
                     timeEntryId: inputEntry.id,
                     description: inputEntry.description,
                     projectId: inputEntry.project.name,
                     chartStatusData,
                     start: dayjs(inputEntry.timeInterval.start)
                        .utc()
                        .format("YYYY-MM-DDTHH:mm:ss[Z]")
                        .toString(),
                     end: dayjs(inputEntry.timeInterval.end)
                        .utc()
                        .format("YYYY-MM-DDTHH:mm:ss[Z]")
                        .toString(),
                     duration: inputEntry.timeInterval.duration,
                     tagIds: "",
                     taskId: "",
                  },
               })
            )
         )
      )
      .then((response) => {
         console.log("track_entries entry updated", response);
         /* Success! return the response with statusCode 200 */
         return {
            statusCode: 200,
            body: JSON.stringify(response),
         };
      })
      .catch((error) => {
         console.log("error", error);
         /* Error! return the error with statusCode 400 */
         return {
            statusCode: 400,
            body: JSON.stringify(error),
         };
      });
};
