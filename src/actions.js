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
      parsedKeypoints,
      parsedObjective,
      ...resumeParamObj
   } = resumeEntries;

   const resumeParam = JSON.parse(JSON.stringify(resumeParamObj));
   const promiseArr = [];
   resumeParam.prompt = "prompt1";
   const prompt1Promise = ResumeApi.create(resumeParam);
   promiseArr.push(prompt1Promise);
   resumeParam.prompt = "prompt2";
   const prompt2Promise = ResumeApi.create1(resumeParam);
   promiseArr.push(prompt2Promise);
   resumeParam.prompt = "prompt3";
   const prompt3Promise = ResumeApi.create2(resumeParam);
   promiseArr.push(prompt3Promise);

   return Promise.allSettled(promiseArr)
      .then((results) => {
         const successfulResponses = [];
         const retryRequests = [];

         results.forEach((result) => {
            if (result.status === "fulfilled") {
               successfulResponses.push(result.value.data);
            } else {
               retryRequests.push(result.reason.config);
            }
         });
         console.log("successfulResponses", successfulResponses);
         // Retry failed requests
         const retryPromises = retryRequests.map(retryRequest);
         // Execute the retry promises
         return Promise.allSettled(retryPromises).then((retryResults) => {
            const secondTryRequests = [];
            retryResults.forEach((result) => {
               if (result.status === "fulfilled") {
                  successfulResponses.push(result.value.data);
               } else {
                  secondTryRequests.push(result.reason.config);
               }
            });

            const secondRetryPromises = secondTryRequests.map(retryRequest);
            return Promise.allSettled(secondRetryPromises).then(
               (secondRetryResults) => {
                  secondRetryResults.forEach((result) => {
                     if (result.status === "fulfilled") {
                        successfulResponses.push(result.value.data);
                     }
                  });
                  let resumeResultData = {};
                  resumeResultData = {
                     ...resumeEntries,
                     ...successfulResponses[0],
                     ...successfulResponses[1],
                     ...successfulResponses[2],
                  };
                  console.log("resumeResultData", resumeResultData);
                  dispatch(fetchResumeSuccess(resumeResultData));
               }
            );
         });
      })
      .catch((err) => dispatch(fetchResumeFailure(err.message)));
};
