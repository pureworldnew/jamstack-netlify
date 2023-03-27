/* Api methods to call /functions */

import axios from "axios";

const create = (data) => {
   console.log("plan is for testing", data);
   return fetch("/.netlify/functions/plan-create", {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const readAll = () => axios.get("/.netlify/functions/plan-read-all");

const readOnlyCurrent = () =>
   axios.get("/.netlify/functions/plan-read-only-current");

const update = (planId, data) =>
   fetch(`/.netlify/functions/plan-update/${planId}`, {
      body: JSON.stringify(data),
      method: "POST",
   });

const deletePlan = (planId) =>
   fetch(`/.netlify/functions/plan-delete/${planId}`, {
      method: "POST",
   });

const batchDeletePlan = (planIds) =>
   fetch(`/.netlify/functions/plan-delete-batch`, {
      body: JSON.stringify({
         ids: planIds,
      }),
      method: "POST",
   });

export default {
   create,
   readAll,
   readOnlyCurrent,
   update,
   delete: deletePlan,
   batchDelete: batchDeletePlan,
};
