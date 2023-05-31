/* Api methods to call /functions */

import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/track-create", {
      data,
   });

const createClockifyApiMeta = (data) =>
   axios.post("/.netlify/functions/track-clockify-meta-create", {
      ...data,
   });

const readAll = () => axios.get("/.netlify/functions/track-read-all");

const readClockifyApiMeta = async () =>
   axios.get("/.netlify/functions/track-clockify-meta-read");

const udpateClockifyApiMeta = (clockifyMetaId, data) =>
   axios.post(
      `/.netlify/functions/track-clockify-meta-update/${clockifyMetaId}`,
      {
         ...data,
      }
   );

const update = (trackId, data) =>
   axios.post(`/.netlify/functions/track-update/${trackId}`, {
      ...data,
   });

const deleteTrack = (trackId) =>
   axios.post(`/.netlify/functions/track-delete/${trackId}`);

const batchDeleteTrack = (trackIds) =>
   axios.post(`/.netlify/functions/track-delete-batch`, {
      ids: trackIds,
   });

export default {
   create,
   createClockifyApiMeta,
   readClockifyApiMeta,
   udpateClockifyApiMeta,
   readAll,
   update,
   delete: deleteTrack,
   batchDelete: batchDeleteTrack,
};
