/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/stress-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/stress-read-all").then((response) => {
    return response.json();
  });
};

const update = (stressId, data) => {
  return fetch(`/.netlify/functions/stress-update/${stressId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteStress = (stressId) => {
  return fetch(`/.netlify/functions/stress-delete/${stressId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteStress = (stressIds) => {
  return fetch(`/.netlify/functions/stress-delete-batch`, {
    body: JSON.stringify({
      ids: stressIds,
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
  delete: deleteStress,
  batchDelete: batchDeleteStress,
};
