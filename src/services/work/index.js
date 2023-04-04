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

const update = (workId, data) => {
   console.log("workid, data", workId, data);
   return axios.post(`/.netlify/functions/work-update/${workId}`, {
      ...data,
   });
};

const deleteWork = (workId) => {
   console.log("workId is", workId);
   return axios.post(`/.netlify/functions/work-delete/${workId}`);
};

const batchDeleteWork = (workIds) =>
   axios.post(`/.netlify/functions/work-delete-batch`, {
      ids: workIds,
   });

export default {
   create,
   readAll,
   update,
   delete: deleteWork,
   batchDelete: batchDeleteWork,
};
