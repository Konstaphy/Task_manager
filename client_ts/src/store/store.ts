import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {root} from "./reducers/reducers";

export const store = createStore(root, applyMiddleware(thunk))