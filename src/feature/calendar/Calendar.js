/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";

import calendarAPI from "services/calendar";

function Calendar() {
   const [events, setEvents] = useState([]);
   const [dateRange, setDateRange] = useState("");

   const fetchCalendarEvents = async () => {
      try {
         const response = await calendarAPI.getCalendarToken({
            dateRange,
         });
         console.log("event response", response);
         setEvents(response.data?.events);
      } catch (error) {
         console.error("Error fetching calendar events", error);
      }
   };

   useEffect(() => {
      fetchCalendarEvents();
   }, []);

   return (
      <div>
         <ul>
            {events
               ? events?.map((event) => (
                    <li key={event.id}>
                       {event.summary}, {event.creator.email},{" "}
                       {event.start.dateTime}, {event.end.dateTime}
                    </li>
                 ))
               : ""}
         </ul>
      </div>
   );
}

export default Calendar;
