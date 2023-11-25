import ResumeApi from "services/resume";
import retryRequest from "utils/retryRequest";
// Action types
export const FETCH_RESUME_REQUEST = "FETCH_RESUME_REQUEST";
export const FETCH_RESUME_SUCCESS = "FETCH_RESUME_SUCCESS";
export const FETCH_RESUME_FAILURE = "FETCH_RESUME_FAILURE";

// Action creators
export const fetchResumeRequest = (resumeEntries) => ({
   type: FETCH_RESUME_REQUEST,
   payload: resumeEntries,
});

export const fetchResumeSuccess = (resumeData) => ({
   type: FETCH_RESUME_SUCCESS,
   payload: resumeData,
});

export const fetchResumeFailure = (error) => ({
   type: FETCH_RESUME_FAILURE,
   payload: error,
});

export const fetchResumeData = (resumeEntries) => (dispatch) => {
   dispatch(fetchResumeRequest(resumeEntries));

   const {
      id,
      email,
      address,
      phone,
      linkedin,
      collegeName,
      collegeDegree,
      collegeMajor,
      collegePeriod,
      parsedJobResp,
      parsedObjective,
      ...resumeParamObj
   } = resumeEntries;

   const resumeParam = JSON.parse(JSON.stringify(resumeParamObj));
   const promiseArr = [];
   resumeParam.prompt = "prompt1";
   const prompt1Promise = ResumeApi.create(resumeParam);
   promiseArr.push(prompt1Promise);
   resumeParam.prompt = "prompt2";
   const prompt2Promise = ResumeApi.create(resumeParam);
   promiseArr.push(prompt2Promise);
   resumeParam.prompt = "prompt3";
   const prompt3Promise = ResumeApi.create(resumeParam);
   promiseArr.push(prompt3Promise);
   resumeParam.prompt = "prompt4";
   const prompt4Promise = ResumeApi.create(resumeParam);
   promiseArr.push(prompt4Promise);
   resumeParam.prompt = "prompt5";
   const prompt5Promise = ResumeApi.create(resumeParam);
   promiseArr.push(prompt5Promise);
   const successfulResponses = [];
   function getFulfilled(promises) {
      Promise.allSettled(promises)
         .then((results) => {
            const retryRequests = [];
            results.forEach((result) => {
               if (result.status === "fulfilled") {
                  successfulResponses.push(result.value.data);
               } else {
                  retryRequests.push(result.reason.config);
               }
            });
            if (retryRequests.length === 0) {
               let resumeResultData = {};
               resumeResultData = {
                  ...resumeEntries,
                  ...successfulResponses[0],
                  ...successfulResponses[1],
                  ...successfulResponses[2],
                  ...successfulResponses[3],
                  ...successfulResponses[4],
               };
               console.log("resumeResultData", resumeResultData);
               dispatch(fetchResumeSuccess(resumeResultData));
            } else {
               const retryPromises = retryRequests.map(retryRequest);
               getFulfilled(retryPromises);
            }
         })
         .catch((err) => dispatch(fetchResumeFailure(err.message)));
   }

   getFulfilled(promiseArr);
};
