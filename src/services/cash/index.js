/* Api methods to call /functions */
import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/cash-create", {
      ...data,
   });

const readAll = () => axios.get("/.netlify/functions/cash-read-all");

const update = (cashId, data) =>
   axios.post(`/.netlify/functions/cash-update/${cashId}`, {
      ...data,
   });

const deleteCash = (cashId) =>
   axios.post(`/.netlify/functions/cash-delete/${cashId}`);

const batchDeleteCash = (cashIds) =>
   axios.post(`/.netlify/functions/cash-delete-batch`, {
      ids: cashIds,
   });

const cashDashboardSum = (dateMonth) =>
   axios.post("/.netlify/functions/cash-dashboard-sum", {
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
