/* Api methods to call /functions */

const create = (data) => {
   fetch("/.netlify/functions/track-create", {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const createClockifyApiMeta = (data) => {
   fetch("/.netlify/functions/track-clockify-meta-create", {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const readAll = () => {
   fetch("/.netlify/functions/track-read-all");
};

const readClockifyApiMeta = () => {
   fetch("/.netlify/functions/track-clockify-meta-read");
};

const udpateClockifyApiMeta = (clockifyMetaId, data) => {
   fetch(`/.netlify/functions/track-clockify-meta-update/${clockifyMetaId}`, {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const update = (trackId, data) => {
   fetch(`/.netlify/functions/track-update/${trackId}`, {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const deleteTrack = (trackId) => {
   fetch(`/.netlify/functions/track-delete/${trackId}`, {
      method: "POST",
   });
};

const batchDeleteTrack = (trackIds) => {
   fetch(`/.netlify/functions/track-delete-batch`, {
      body: JSON.stringify({
         ids: trackIds,
      }),
      method: "POST",
   });
};

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
