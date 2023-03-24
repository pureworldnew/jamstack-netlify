/* Api methods to call /functions */

const create = (data) => {
   fetch("/.netlify/functions/work-create", {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const readAll = () => {
   fetch("/.netlify/functions/work-read-all");
};

const update = (workId, data) => {
   fetch(`/.netlify/functions/work-update/${workId}`, {
      body: JSON.stringify(data),
      method: "POST",
   });
};

const deleteWork = (workId) => {
   fetch(`/.netlify/functions/work-delete/${workId}`, {
      method: "POST",
   });
};

const batchDeleteWork = (workIds) => {
   fetch(`/.netlify/functions/work-delete-batch`, {
      body: JSON.stringify({
         ids: workIds,
      }),
      method: "POST",
   });
};

export default {
   create,
   readAll,
   update,
   delete: deleteWork,
   batchDelete: batchDeleteWork,
};
