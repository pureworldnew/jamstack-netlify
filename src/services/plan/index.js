/* Api methods to call /functions */

import axios from "axios";

const create = (data) =>
   axios.post("/.netlify/functions/plan-create", {
      ...data,
   });

const readAll = () => axios.get("/.netlify/functions/plan-read-all");

const readOnlyCurrent = () =>
   axios.get("/.netlify/functions/plan-read-only-current");

const update = (planId, data) =>
   axios.post(`/.netlify/functions/plan-update/${planId}`, {
      ...data,
   });

const deletePlan = (planId) =>
   axios.post(`/.netlify/functions/plan-delete/${planId}`);

const batchDeletePlan = (planIds) =>
   axios.post(`/.netlify/functions/plan-delete-batch`, {
      ids: planIds,
   });
export default {
   create,
   readAll,
   readOnlyCurrent,
   update,
   delete: deletePlan,
   batchDelete: batchDeletePlan,
};
