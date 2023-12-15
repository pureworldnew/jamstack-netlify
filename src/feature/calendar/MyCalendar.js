/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { BackDrop } from "components/backdrop";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import calendarAPI from "services/calendar";
import { formatDateMin } from "utils/formatDate";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function AvailableTimeBlocks({ availableTimeBlocks }) {
   return (
      <>
         <Typography>Available Time for today:</Typography>

         {availableTimeBlocks.map((block, index) => (
            <Grid container spacing={2} key={index} flexDirection="row">
               <Grid item xs={3} md={3}>
                  {formatDateMin(new Date(block.start))} ~{" "}
                  {formatDateMin(new Date(block.end))}
               </Grid>
            </Grid>
         ))}
      </>
   );
}
function MyCalendar() {
   const [loading, setLoading] = useState(false);

   const [events, setEvents] = useState([]);
   const [timeBlocks, setTimeBlocks] = useState([]);
   const [dateRange, setDateRange] = useState("");

   const fetchCalendarEvents = async () => {
      try {
         const response = await calendarAPI.getCalendarToken({
            dateRange,
         });
         console.log("response from calendar api", response.data);
         const calEvns = response.data?.events.map((eventItem) => ({
            id: eventItem.id,
            title: eventItem.summary,
            start: new Date(eventItem.start),
            end: new Date(eventItem.end),
         }));
         setEvents(calEvns);
         setTimeBlocks(response.data.availableTimeBlocks);
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
               <>
                  <AvailableTimeBlocks availableTimeBlocks={timeBlocks} />
                  <Calendar
                     localizer={localizer}
                     events={events}
                     startAccessor="start"
                     endAccessor="end"
                     style={{ height: 750 }}
                  />
               </>
            )}
         </ul>
      </div>
   );
}

export default MyCalendar;
