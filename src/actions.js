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

   const ResumePromise = JSON.parse(JSON.stringify(resumeEntries));
   const promiseArr = [];
   ResumePromise.prompt = "prompt1";
   const prompt1Promise = ResumeApi.create(ResumePromise);
   promiseArr.push(retryPromise(() => prompt1Promise, 3, 1000));
   ResumePromise.prompt = "prompt2";
   const prompt2Promise = ResumeApi.create(ResumePromise);
   promiseArr.push(retryPromise(() => prompt2Promise, 3, 1000));
   ResumePromise.prompt = "prompt3";
   const prompt3Promise = ResumeApi.create(ResumePromise);
   promiseArr.push(retryPromise(() => prompt3Promise, 3, 1000));

   return Promise.all(promiseArr)
      .then((res) => {
         const resumeResultData = {
            ...res[0].data,
            ...res[1].data,
            ...res[2].data,
         };
         console.log("resumeResultData", resumeResultData);
         dispatch(fetchResumeSuccess(resumeResultData));
      })
      .catch((err) => dispatch(fetchResumeFailure(err.message)));
};
