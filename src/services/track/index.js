/* Api methods to call /functions */

const create = async (data) => {
  const response = await fetch("/.netlify/functions/track-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const createClockifyApiMeta = async (data) => {
  const response = await fetch(
    "/.netlify/functions/track-clockify-meta-create",
    {
      body: JSON.stringify(data),
      method: "POST",
    }
  );
  return await response.json();
};

const readAll = async () => {
  const response = await fetch("/.netlify/functions/track-read-all");
  return await response.json();
};

const readClockifyApiMeta = async () => {
  const response = await fetch("/.netlify/functions/track-clockify-meta-read");
  return await response.json();
};

const udpateClockifyApiMeta = async (clockifyMetaId, data) => {
  const response = await fetch(
    `/.netlify/functions/track-clockify-meta-update/${clockifyMetaId}`,
    {
      body: JSON.stringify(data),
      method: "POST",
    }
  );
  return await response.json();
};

const update = async (trackId, data) => {
  const response = await fetch(`/.netlify/functions/track-update/${trackId}`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const deleteTrack = async (trackId) => {
  const response = await fetch(`/.netlify/functions/track-delete/${trackId}`, {
    method: "POST",
  });
  return await response.json();
};

const batchDeleteTrack = async (trackIds) => {
  const response = await fetch(`/.netlify/functions/track-delete-batch`, {
    body: JSON.stringify({
      ids: trackIds,
    }),
    method: "POST",
  });
  return await response.json();
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
