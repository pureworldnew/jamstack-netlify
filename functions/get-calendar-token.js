/* eslint-disable no-unused-vars */
// functions/authenticate.js
const { google } = require("googleapis");
const moment = require("moment-timezone");

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const { GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL, GOOGLE_PROJECT_NUMBER } =
   process.env;
const calendarIds = ["jamescrmlarro@gmail.com", "jonathandreamdev@gmail.com"]; // Replace with your actual calendar IDs

const getFormatDateTime = (dateTime, timeZone) => {
   // Create a Moment object with the given dateTime and timeZone
   const momentObj = moment(dateTime).tz(timeZone);
   return momentObj.toDate();
};

exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);
   console.log("get-calendar-toke invoked", data);
   const formattedPrivateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

   const jwtClient = new google.auth.JWT(
      GOOGLE_CLIENT_EMAIL,
      null,
      formattedPrivateKey,
      SCOPES
   );

   const calendar = google.calendar({
      version: "v3",
      project: GOOGLE_PROJECT_NUMBER,
      auth: jwtClient,
   });
   try {
      const promises = calendarIds.map(async (calendarId) => {
         const result = await calendar.events.list({
            calendarId,
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
         });

         return result.data.items;
      });

      const allEvents = (await Promise.all(promises)).flat();

      if (allEvents.length) {
         const formattedEvents = [];
         allEvents.forEach((each) => {
            const { summary, id, start, end } = each;
            formattedEvents.push({
               summary,
               id,
               start: getFormatDateTime(start.dateTime, start.timeZone),
               end: getFormatDateTime(end.dateTime, end.timeZone),
            });
         });
         return {
            statusCode: 200,
            body: JSON.stringify({ events: formattedEvents }),
            headers: {
               "Content-Type": "application/json",
            },
         };
      }
      return {
         statusCode: 200,
         body: JSON.stringify({ message: "No upcoming events found." }),
         headers: {
            "Content-Type": "application/json",
         },
      };
   } catch (error) {
      console.error("Error fetching calendar events", error);
      return {
         statusCode: 500,
         body: JSON.stringify({ error: "Internal Server Error" }),
      };
   }
};
