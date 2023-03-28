/* Api methods to call /functions */
import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/work-create", {
      ...data,
   });

const readAll = () => axios.get("/.netlify/functions/work-read-all");

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
   update,
   delete: deleteWork,
   batchDelete: batchDeleteWork,
};
