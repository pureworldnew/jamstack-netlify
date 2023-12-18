import api from "services/api";

const getCalendarToken = (data) =>
   api({
      method: "post",
      url: "/.netlify/functions/get-calendar-token",
      data,
   });

export default {
   getCalendarToken,
};
