/* Api methods to call /functions */
import api from "services/api";

const create = (data) =>
   api.post("/.netlify/functions/stress-create", {
      ...data,
   });

const readAll = async () => {
   const response = await api.get("/.netlify/functions/stress-read-all");
   return response.data;
};

const update = (stressId, data) =>
   api.post(`/.netlify/functions/stress-update/${stressId}`, {
      ...data,
   });

const deleteStress = (stressId) =>
   api.post(`/.netlify/functions/stress-delete/${stressId}`);

const batchDeleteStress = (stressIds) =>
   api.post(`/.netlify/functions/stress-delete-batch`, {
      ids: stressIds,
   });

export default {
   create,
   readAll,
   update,
   delete: deleteStress,
   batchDelete: batchDeleteStress,
};
