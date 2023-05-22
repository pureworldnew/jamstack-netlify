/* eslint-disable default-param-last */
import {
   FETCH_RESUME_REQUEST,
   FETCH_RESUME_SUCCESS,
   FETCH_RESUME_FAILURE,
} from "./actions";

const initialResumeState = {
   resumeData: {},
   resumeLoading: false,
   resumeError: null,
};

export function resumeReducer(state = initialResumeState, action) {
   switch (action.type) {
      case FETCH_RESUME_REQUEST:
         return {
            ...state,
            resumeLoading: true,
            resumeError: null,
         };
      case FETCH_RESUME_SUCCESS:
         return {
            ...state,
            resumeLoading: false,
            resumeData: action.payload,
         };
      case FETCH_RESUME_FAILURE:
         return {
            ...state,
            resumeLoading: false,
            resumeError: action.payload,
         };
      default:
         return state;
   }
}
