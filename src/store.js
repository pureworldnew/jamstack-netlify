/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { resumeReducer } from "./reducers"; // Import your reducer file

const rootReducer = combineReducers({
   resume: resumeReducer,
   // Add more reducers if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
