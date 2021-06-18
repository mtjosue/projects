import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { robotReducer } from "./redux/reducers/robotReducer";
import { projectReducer } from "./redux/reducers/projectReducer";
import logger from "redux-logger";

const reducers = combineReducers({
  robots: robotReducer,
  projects: projectReducer,
});

const middleware = [thunk, logger];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
