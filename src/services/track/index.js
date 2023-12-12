/* eslint-disable consistent-return */
/* Api methods to call /functions */

import axios from "axios";
import useClockify from "hooks/useClockify";

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

const updateClockifyApiMeta = (clockifyMetaId, data) =>
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
const getProjectName = async () => {
   try {
      const clockifyMeta = await readClockifyApiMeta();
      console.log("clockifyMeta ", clockifyMeta);

      if (clockifyMeta.data.length === 1) {
         const { workspaceId } = clockifyMeta.data[0].data;
         return useClockify(
            `https://api.clockify.me/api/v1/workspaces/${workspaceId}/projects`,
            "GET"
         )
            .then((response) => response.map((each) => each.name))
            .catch((err) => {
               console.log(err);
            });
      }
   } catch (err) {
      console.log(err);
      return err;
   }
};

export default {
   create,
   createClockifyApiMeta,
   readClockifyApiMeta,
   updateClockifyApiMeta,
   readAll,
   update,
   delete: deleteTrack,
   batchDelete: batchDeleteTrack,
   getProjectName,
};
