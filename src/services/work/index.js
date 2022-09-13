/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/work-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/work-read-all").then((response) => {
    return response.json();
  });
};

const update = (workId, data) => {
  return fetch(`/.netlify/functions/work-update/${workId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteWork = (workId) => {
  return fetch(`/.netlify/functions/work-delete/${workId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteWork = (workIds) => {
  return fetch(`/.netlify/functions/work-delete-batch`, {
    body: JSON.stringify({
      ids: workIds,
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
  delete: deleteWork,
  batchDelete: batchDeleteWork,
};
