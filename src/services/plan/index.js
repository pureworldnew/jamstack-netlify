/* eslint-disable no-param-reassign */
import api from "services/api";

const create = (data) =>
   api.post("/.netlify/functions/plan-create", {
      ...data,
   });

const readAll = () => api.get("/.netlify/functions/plan-read-all");

const readOnlyCurrent = () =>
   api.get("/.netlify/functions/plan-read-only-current");

const update = (planId, data) =>
   api.post(`/.netlify/functions/plan-update/${planId}`, {
      ...data,
   });

const deletePlan = (planId) =>
   api.post(`/.netlify/functions/plan-delete/${planId}`);

const batchDeletePlan = (planIds) =>
   api.post(`/.netlify/functions/plan-delete-batch`, {
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
