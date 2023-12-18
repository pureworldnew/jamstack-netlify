/* eslint-disable consistent-return */
/* Api methods to call /functions */

import api from "services/api";

import useClockify from "hooks/useClockify";

const create = (data) =>
   api.post("/.netlify/functions/track-create", {
      data,
   });

const createClockifyApiMeta = (data) =>
   api.post("/.netlify/functions/track-clockify-meta-create", {
      ...data,
   });

const readAll = () => api.get("/.netlify/functions/track-read-all");

const readClockifyApiMeta = async () =>
   api.get("/.netlify/functions/track-clockify-meta-read");

const updateClockifyApiMeta = (clockifyMetaId, data) =>
   api.post(
      `/.netlify/functions/track-clockify-meta-update/${clockifyMetaId}`,
      {
         ...data,
      }
   );

const update = (trackId, data) =>
   api.post(`/.netlify/functions/track-update/${trackId}`, {
      ...data,
   });

const deleteTrack = (trackId) =>
   api.post(`/.netlify/functions/track-delete/${trackId}`);

const batchDeleteTrack = (trackIds) =>
   api.post(`/.netlify/functions/track-delete-batch`, {
      ids: trackIds,
   });
const getProjectName = async () => {
   try {
      const clockifyMeta = await readClockifyApiMeta();

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
