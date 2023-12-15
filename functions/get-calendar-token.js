/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
// functions/authenticate.js
const { google } = require("googleapis");
const moment = require("moment-timezone");

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const {
   GOOGLE_PRIVATE_KEY,
   GOOGLE_CLIENT_EMAIL,
   GOOGLE_PROJECT_NUMBER,
   JAMES_EMAIL,
   JONATHAN_EMAIL,
   TRAVIS_EMAIL,
   RICHARD_EMAIL,
} = process.env;
const calendarIds = [JAMES_EMAIL, JONATHAN_EMAIL, TRAVIS_EMAIL, RICHARD_EMAIL]; // Replace with your actual calendar IDs

const getFormatDateTime = (dateTime, timeZone) => {
   // Create a Moment object with the given dateTime and timeZone
   const momentObj = moment(dateTime).tz(timeZone);
   return momentObj.toDate();
};

// Function to calculate available time blocks from now
function calculateAvailableTimeBlocksFromNow(excludedTimeBlocks) {
   // Set the current date
   const currentDate = moment();

   // Define the working hours (you can adjust these as needed)
   const startOfWork = moment().set({
      hour: 7,
      minute: 0,
      second: 0,
      millisecond: 0,
   });
   const endOfWork = moment().set({
      hour: 16,
      minute: 0,
      second: 0,
      millisecond: 0,
   });

   const availableTimeBlocks = [];

   // If the current time is before the end of the working hours
   if (currentDate.isBefore(endOfWork)) {
      const currentMoment = moment.max(currentDate, startOfWork.clone());
      let currentBlockStart = null;
      let currentBlockEnd = null;

      while (currentMoment.isBefore(endOfWork)) {
         const blockStart = currentMoment.clone();
         currentMoment.add(30, "minutes");
         const blockEnd = currentMoment.clone();

         // Check if the time block is excluded
         const isExcluded = excludedTimeBlocks.some((block) => {
            const start = moment(block.start);
            const end = moment(block.end);
            return blockStart.isBefore(end) && blockEnd.isAfter(start);
         });

         if (!isExcluded) {
            // If not excluded, extend the current available time block
            if (currentBlockStart === null) {
               currentBlockStart = blockStart;
            }
            currentBlockEnd = blockEnd;
         } else {
            // If excluded, add the current available time block to the result
            if (currentBlockStart !== null) {
               availableTimeBlocks.push({
                  start: currentBlockStart.format(),
                  end: currentBlockEnd.format(),
               });
               currentBlockStart = null;
               currentBlockEnd = null;
            }
         }
      }

      // Add the last available time block if it exists
      if (currentBlockStart !== null) {
         availableTimeBlocks.push({
            start: currentBlockStart.format(),
            end: currentBlockEnd.format(),
         });
      }
   }

   return availableTimeBlocks;
}

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
   const excludedTimeBlocks = [
      { start: "2023-12-15T12:00:00", end: "2023-12-15T13:00:00" },
      // Add more excluded time blocks as needed
   ];

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
         console.log("formattedEvents", formattedEvents);
         const availableTimeBlocks =
            calculateAvailableTimeBlocksFromNow(formattedEvents);
         console.log("Available time blocks today:");
         availableTimeBlocks.forEach((block) => {
            console.log(`${block.start} to ${block.end}`);
         });
         return {
            statusCode: 200,
            body: JSON.stringify({
               events: formattedEvents,
               availableTimeBlocks,
            }),
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
