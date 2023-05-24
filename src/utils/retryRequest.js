import ResumeApi from "services/resume";

const retryRequest = async (resumeParam) => {
   try {
      const response = await ResumeApi.create(JSON.parse(resumeParam.data));
      return response;
   } catch (error) {
      console.error("Error:", error);
      throw error;
   }
};

export default retryRequest;
