/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/track-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    console.log("response", response);
    return response.json();
  });
};

const createClockifyApiMeta = (data) => {
  return fetch("/.netlify/functions/track-clockify-meta-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    console.log("response", response);
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/track-read-all").then((response) => {
    return response.json();
  });
};

const readClockifyApiMeta = () => {
  return fetch("/.netlify/functions/track-clockify-meta-read").then(
    (response) => {
      return response.json();
    }
  );
};

const udpateClockifyApiMeta = (clockifyMetaId, data) => {
  return fetch(
    `/.netlify/functions/track-clockify-meta-update/${clockifyMetaId}`,
    {
      body: JSON.stringify(data),
      method: "POST",
    }
  ).then((response) => {
    return response.json();
  });
};

const update = (trackId, data) => {
  return fetch(`/.netlify/functions/track-update/${trackId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteTrack = (trackId) => {
  return fetch(`/.netlify/functions/track-delete/${trackId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteTrack = (trackIds) => {
  return fetch(`/.netlify/functions/track-delete-batch`, {
    body: JSON.stringify({
      ids: trackIds,
    }),
    method: "POST",
  }).then((response) => {
    return response.json();
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
