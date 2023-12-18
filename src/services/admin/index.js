/* Api methods to call /functions */
import api from "services/api";

const create = (data) =>
   api.post("/.netlify/functions/profile-create", {
      ...data,
   });

const readAll = async () => {
   const response = await api.get("/.netlify/functions/profile-read-all");
   return response.data;
};

const update = (profileId, data) =>
   api.post(`/.netlify/functions/profile-update/${profileId}`, {
      ...data,
   });

const deleteProfile = (profileId) =>
   api.post(`/.netlify/functions/profile-delete/${profileId}`);

const batchDeleteProfile = (profileIds) =>
   api.post(`/.netlify/functions/profile-delete-batch`, {
      ids: profileIds,
   });

export default {
   create,
   readAll,
   update,
   delete: deleteProfile,
   batchDelete: batchDeleteProfile,
};
