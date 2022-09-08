/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/plan-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/plan-read-all").then((response) => {
    return response.json();
  });
};

const update = (planId, data) => {
  return fetch(`/.netlify/functions/plan-update/${planId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deletePlan = (planId) => {
  return fetch(`/.netlify/functions/plan-delete/${planId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeletePlan = (planIds) => {
  return fetch(`/.netlify/functions/plan-delete-batch`, {
    body: JSON.stringify({
      ids: planIds,
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
  delete: deletePlan,
  batchDelete: batchDeletePlan,
};
