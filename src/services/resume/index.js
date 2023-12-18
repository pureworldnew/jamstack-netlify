/* Api methods to call /functions */
import api from "services/api";

const create = (data) =>
   api.post("/.netlify/functions/resume-create", {
      ...data,
   });

const readAll = async () => {
   const response = await api.get("/.netlify/functions/resume-read-all");
   return response.data;
};

export default {
   create,
   readAll,
};
