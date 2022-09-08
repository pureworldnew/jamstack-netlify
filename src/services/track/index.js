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

const readAll = () => {
  return fetch("/.netlify/functions/track-read-all").then((response) => {
    return response.json();
  });
};

const update = (todoId, data) => {
  return fetch(`/.netlify/functions/track-update/${todoId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteTrack = (todoId) => {
  return fetch(`/.netlify/functions/track-delete/${todoId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteTrack = (todoIds) => {
  return fetch(`/.netlify/functions/track-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds,
    }),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

export default {
  create,
  readAll,
  update,
  delete: deleteTrack,
  batchDelete: batchDeleteTrack,
};
