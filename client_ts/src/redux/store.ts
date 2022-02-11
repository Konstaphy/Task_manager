import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { RootReducer } from "redux/reducers/rootReducer";

export const store = createStore(RootReducer, applyMiddleware(thunk));
