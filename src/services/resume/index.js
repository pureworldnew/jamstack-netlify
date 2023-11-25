/* Api methods to call /functions */
import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/resume-create", {
      ...data,
   });

const readAll = async () => {
   const response = await axios.get("/.netlify/functions/resume-read-all");
   return response.data;
};

export default {
   create,
   readAll,
};
