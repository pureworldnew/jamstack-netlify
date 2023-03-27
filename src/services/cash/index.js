/* Api methods to call /functions */
import axios from "axios";

const create = (data) => {
   fetch("/.netlify/functions/cash-create", {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const readAll = () => axios.get("/.netlify/functions/cash-read-all");

const update = (cashId, data) => {
   fetch(`/.netlify/functions/cash-update/${cashId}`, {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const deleteCash = (cashId) => {
   fetch(`/.netlify/functions/cash-delete/${cashId}`, {
      method: "POST",
   });
};

const batchDeleteCash = (cashIds) => {
   fetch(`/.netlify/functions/cash-delete-batch`, {
      body: JSON.stringify({
         ids: cashIds,
      }),
      method: "POST",
   });
};

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
