/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
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
 * "data": {
    "timeEntryId": "637de60d9ad0680bb6353caf",
    "description": "washing",
    "projectId": "",
    "chartStatusData": [
      {
        "trackCreateDate": "2022-11-23",
        "duration": "22.18",
        "projectName": ""
      }
    ],
    "start": "2022-11-23T09:21:15Z",
    "end": "2022-11-23T09:43:26Z",
    "duration": "PT22M11S",
    "tagIds": "",
    "taskId": ""
  }
 * @param {*} context 
 * @returns 
 */

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   console.log("Function `track-create-hook` invoked");
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
   const newTimeEntry = {
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
   };
   try {
      const response = await getDBClient().query(
         q.Create(q.Collection("track_entries"), newTimeEntry)
      );
      return sendResponse(200, response);
   } catch (err) {
      return sendResponse(500, err);
   }
};
