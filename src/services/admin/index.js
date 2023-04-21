/* Api methods to call /functions */
import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/profile-create", {
      ...data,
   });

const readAll = async () => {
   const response = await axios.get("/.netlify/functions/profile-read-all");
   return response.data;
};

const update = (profileId, data) => {
   console.log("profileid, data", profileId, data);
   return axios.post(`/.netlify/functions/profile-update/${profileId}`, {
      ...data,
   });
};

const deleteprofile = (profileId) => {
   console.log("profileId is", profileId);
   return axios.post(`/.netlify/functions/profile-delete/${profileId}`);
};

const batchDeleteprofile = (profileIds) =>
   axios.post(`/.netlify/functions/profile-delete-batch`, {
      ids: profileIds,
   });

export default {
   create,
   readAll,
   update,
   delete: deleteprofile,
   batchDelete: batchDeleteprofile,
};
