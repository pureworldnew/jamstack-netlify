/* Api methods to call /functions */

const create = async (data) => {
  console.log("plan is for testing", data);
  const response = await fetch("/.netlify/functions/plan-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const readAll = async () => {
  let response = await fetch("/.netlify/functions/plan-read-all");
  return response.json();
};

const readOnlyCurrent = async () => {
  const response = await fetch("/.netlify/functions/plan-read-only-current");
  return await response.json();
};

const update = async (planId, data) => {
  const response = await fetch(`/.netlify/functions/plan-update/${planId}`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const deletePlan = async (planId) => {
  const response = await fetch(`/.netlify/functions/plan-delete/${planId}`, {
    method: "POST",
  });
  return await response.json();
};

const batchDeletePlan = async (planIds) => {
  const response = await fetch(`/.netlify/functions/plan-delete-batch`, {
    body: JSON.stringify({
      ids: planIds,
    }),
    method: "POST",
  });
  return await response.json();
};

export default {
  create,
  readAll,
  readOnlyCurrent,
  update,
  delete: deletePlan,
  batchDelete: batchDeletePlan,
};
