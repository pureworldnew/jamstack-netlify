/* Api methods to call /functions */
import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/work-create", {
      ...data,
   });

const readAll = async () => {
   const response = await axios.get("/.netlify/functions/work-read-all");
   return response.data;
};

const checkDupCompany = async (companyName) => {
   console.log("companyName is", companyName);
   const response = await axios.post(
      `/.netlify/functions/work-check-dup-company/${companyName}`
   );
   return response.data;
};

const update = (workId, data) =>
   axios.post(`/.netlify/functions/work-update/${workId}`, {
      ...data,
   });

const deleteWork = (workId) =>
   axios.post(`/.netlify/functions/work-delete/${workId}`);

const batchDeleteWork = (workIds) =>
   axios.post(`/.netlify/functions/work-delete-batch`, {
      ids: workIds,
   });

export default {
   create,
   readAll,
   checkDupCompany,
   update,
   delete: deleteWork,
   batchDelete: batchDeleteWork,
};
