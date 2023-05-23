import ResumeApi from "services/resume";
import retryPromise from "utils/retryPromise";

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
      ...resumeParamObj
   } = resumeEntries;

   const resumeParam = JSON.parse(JSON.stringify(resumeParamObj));
   console.log("real param", resumeParam);
   const promiseArr = [];
   resumeParam.prompt = "prompt1";
   const prompt1Promise = ResumeApi.create(resumeParam);
   promiseArr.push(retryPromise(() => prompt1Promise, 3, 1000));
   resumeParam.prompt = "prompt2";
   const prompt2Promise = ResumeApi.create1(resumeParam);
   promiseArr.push(retryPromise(() => prompt2Promise, 3, 1000));
   resumeParam.prompt = "prompt3";
   const prompt3Promise = ResumeApi.create2(resumeParam);
   promiseArr.push(retryPromise(() => prompt3Promise, 3, 1000));

   return Promise.allSettled(promiseArr)
      .then((res) => {
         console.log("allsettled response", res);

         const fulfilled = res
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);
         console.log("fulfilled", fulfilled); // [{name: "John Doe", dateAccountCreated: "05-23-2018"}]
         const rejected = res
            .filter((result) => result.status === "rejected")
            .map((result) => result.reason);
         let resumeResultData = {};
         if (!rejected.length) {
            // all fullfilled
            resumeResultData = {
               ...resumeEntries,
               ...fulfilled[0].data,
               ...fulfilled[1].data,
               ...fulfilled[2].data,
            };
         } else {
            console.log("rejected", rejected.config.url); // ['failed to fetch']
         }

         console.log("resumeResultData", resumeResultData);
         dispatch(fetchResumeSuccess(resumeResultData));
      })
      .catch((err) => dispatch(fetchResumeFailure(err.message)));
};
