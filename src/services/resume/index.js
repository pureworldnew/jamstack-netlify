/* Api methods to call /functions */
import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/resume-create", {
      ...data,
   });

const create1 = (data) =>
   axios.post("/.netlify/functions/resume-create1", {
      ...data,
   });

const create2 = (data) =>
   axios.post("/.netlify/functions/resume-create2", {
      ...data,
   });

const readAll = async () => {
   const response = await axios.get("/.netlify/functions/resume-read-all");
   return response.data;
};

export default {
   create,
   create1,
   create2,
   readAll,
};
