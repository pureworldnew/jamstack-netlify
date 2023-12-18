/* Api methods to call /functions */
import api from "services/api";

const create = (data) =>
   api.post("/.netlify/functions/cash-create", {
      ...data,
   });

const readAll = () => api.get("/.netlify/functions/cash-read-all");

const update = (cashId, data) =>
   api.post(`/.netlify/functions/cash-update/${cashId}`, {
      ...data,
   });

const deleteCash = (cashId) =>
   api.post(`/.netlify/functions/cash-delete/${cashId}`);

const batchDeleteCash = (cashIds) =>
   api.post(`/.netlify/functions/cash-delete-batch`, {
      ids: cashIds,
   });

const cashDashboardSum = (dateMonth) =>
   api.post("/.netlify/functions/cash-dashboard-sum", {
      dateMonth,
   });
export default {
   create,
   readAll,
   update,
   delete: deleteCash,
   batchDelete: batchDeleteCash,
   cashDashboardSum,
};
