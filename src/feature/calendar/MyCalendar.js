/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { BackDrop } from "components/backdrop";

import calendarAPI from "services/calendar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {
   const [loading, setLoading] = useState(false);

   const [events, setEvents] = useState([]);
   const [dateRange, setDateRange] = useState("");

   const fetchCalendarEvents = async () => {
      try {
         const response = await calendarAPI.getCalendarToken({
            dateRange,
         });
         const calEvns = response.data?.events.map((eventItem) => ({
            id: eventItem.id,
            title: eventItem.summary,
            start: new Date(eventItem.start),
            end: new Date(eventItem.end),
         }));
         setEvents(calEvns);
         setLoading(false);
      } catch (error) {
         console.error("Error fetching calendar events", error);
      }
   };

   useEffect(() => {
      setLoading(true);
      fetchCalendarEvents();
   }, []);

   return (
      <div>
         <ul>
            {loading ? (
               <BackDrop open={loading} />
            ) : (
               <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 750 }}
               />
            )}
         </ul>
      </div>
   );
}

export default MyCalendar;
