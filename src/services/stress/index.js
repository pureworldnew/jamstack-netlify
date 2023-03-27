/* Api methods to call /functions */

const create = (data) => {
   fetch("/.netlify/functions/stress-create", {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const readAll = () => {
   fetch("/.netlify/functions/stress-read-all");
};

const update = (stressId, data) => {
   fetch(`/.netlify/functions/stress-update/${stressId}`, {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const deleteStress = (stressId) => {
   fetch(`/.netlify/functions/stress-delete/${stressId}`, {
      method: "POST",
   });
};

const batchDeleteStress = (stressIds) => {
   fetch(`/.netlify/functions/stress-delete-batch`, {
      body: JSON.stringify({
         ids: stressIds,
      }),
      method: "POST",
   });
};

export default {
   create,
   readAll,
   update,
   delete: deleteStress,
   batchDelete: batchDeleteStress,
};
