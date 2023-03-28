/* Api methods to call /functions */

import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/stress-create", {
      ...data,
   });

const readAll = () => axios.get("/.netlify/functions/stress-read-all");

const update = (stressId, data) =>
   axios.post(`/.netlify/functions/stress-update/${stressId}`, {
      ...data,
   });

const deleteStress = (stressId) =>
   axios.post(`/.netlify/functions/stress-delete/${stressId}`);

const batchDeleteStress = (stressIds) =>
   axios.post(`/.netlify/functions/stress-delete-batch`, {
      ids: stressIds,
   });

export default {
   create,
   readAll,
   update,
   delete: deleteStress,
   batchDelete: batchDeleteStress,
};
