/* Api methods to call /functions */

const create = async (data) => {
  const response = await fetch("/.netlify/functions/stress-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const readAll = async () => {
  const response = await fetch("/.netlify/functions/stress-read-all");
  return await response.json();
};

const update = async (stressId, data) => {
  const response = await fetch(
    `/.netlify/functions/stress-update/${stressId}`,
    {
      body: JSON.stringify(data),
      method: "POST",
    }
  );
  return await response.json();
};

const deleteStress = async (stressId) => {
  const response = await fetch(
    `/.netlify/functions/stress-delete/${stressId}`,
    {
      method: "POST",
    }
  );
  return await response.json();
};

const batchDeleteStress = async (stressIds) => {
  const response = await fetch(`/.netlify/functions/stress-delete-batch`, {
    body: JSON.stringify({
      ids: stressIds,
    }),
    method: "POST",
  });
  return await response.json();
};

export default {
  create,
  readAll,
  update,
  delete: deleteStress,
  batchDelete: batchDeleteStress,
};
