/* Api methods to call /functions */

const create = async (data) => {
  const response = await fetch("/.netlify/functions/cash-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const readAll = async () => {
  const response = await fetch("/.netlify/functions/cash-read-all");
  return await response.json();
};

const update = async (cashId, data) => {
  const response = await fetch(`/.netlify/functions/cash-update/${cashId}`, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const deleteCash = async (cashId) => {
  const response = await fetch(`/.netlify/functions/cash-delete/${cashId}`, {
    method: "POST",
  });
  return await response.json();
};

const batchDeleteCash = async (cashIds) => {
  const response = await fetch(`/.netlify/functions/cash-delete-batch`, {
    body: JSON.stringify({
      ids: cashIds,
    }),
    method: "POST",
  });
  return await response.json();
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
