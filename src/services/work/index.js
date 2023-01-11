/* Api methods to call /functions */

const create = async (data) => {
  const response = await fetch("/.netlify/functions/work-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const readAll = async () => {
  const response = await fetch("/.netlify/functions/work-read-all");
  return await response.json();
};

const update = async (workId, data) => {
  const response = await fetch(`/.netlify/functions/work-update/${workId}`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const deleteWork = async (workId) => {
  const response = await fetch(`/.netlify/functions/work-delete/${workId}`, {
    method: "POST",
  });
  return await response.json();
};

const batchDeleteWork = async (workIds) => {
  const response = await fetch(`/.netlify/functions/work-delete-batch`, {
    body: JSON.stringify({
      ids: workIds,
    }),
    method: "POST",
  });
  return await response.json();
};

export default {
  create,
  readAll,
  update,
  delete: deleteWork,
  batchDelete: batchDeleteWork,
};
