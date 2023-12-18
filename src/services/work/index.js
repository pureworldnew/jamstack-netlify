/* Api methods to call /functions */
import api from "services/api";

const create = (data) =>
   api.post("/.netlify/functions/work-create", {
      ...data,
   });

const readAll = async () => {
   const response = await api.get("/.netlify/functions/work-read-all");
   return response.data;
};

const checkDupCompany = async (companyName) => {
   const response = await api.post(
      `/.netlify/functions/work-check-dup-company/${companyName}`
   );
   return response.data;
};

const checkMatchRating = async (data) => {
   const response = await api.post("/.netlify/functions/work-resume-match", {
      ...data,
   });
   return response.data;
};

const createWordResume = (resumeDocData) =>
   api.post(
      "/.netlify/functions/work-doc-resume",
      { ...resumeDocData },
      { responseType: "arraybuffer" }
   );

const update = (workId, data) =>
   api.post(`/.netlify/functions/work-update/${workId}`, {
      ...data,
   });

const deleteWork = (workId) =>
   api.post(`/.netlify/functions/work-delete/${workId}`);

const batchDeleteWork = (workIds) =>
   api.post(`/.netlify/functions/work-delete-batch`, {
      ids: workIds,
   });

export default {
   create,
   readAll,
   checkDupCompany,
   createWordResume,
   checkMatchRating,
   update,
   delete: deleteWork,
   batchDelete: batchDeleteWork,
};
