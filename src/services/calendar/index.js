import axios from "axios";

const getCalendarToken = (data) =>
   axios({
      method: "post",
      url: "/.netlify/functions/get-calendar-token",
      data,
   });

export default {
   getCalendarToken,
};
