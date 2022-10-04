/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/cash-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/cash-read-all").then((response) => {
    return response.json();
  });
};

const update = (cashId, data) => {
  return fetch(`/.netlify/functions/cash-update/${cashId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteCash = (cashId) => {
  return fetch(`/.netlify/functions/cash-delete/${cashId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteCash = (cashIds) => {
  return fetch(`/.netlify/functions/cash-delete-batch`, {
    body: JSON.stringify({
      ids: cashIds,
    }),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const cashDashboardSum = async (dateMonth) => {
  let response = await fetch("/.netlify/functions/cash-dashboard-sum", {
    body: JSON.stringify({
      dateMonth: dateMonth,
    }),
    method: "POST",
  });
  return response.json();
};

export default {
  create,
  readAll,
  update,
  delete: deleteCash,
  batchDelete: batchDeleteCash,
  cashDashboardSum,
};
