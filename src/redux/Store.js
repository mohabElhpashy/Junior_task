import { createStore, applyMiddleware } from "redux";
import RootReducer from "../redux/Reducers/RootReducer";
import Logger from "redux-logger";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

export const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(Logger))
);
export const presistor = persistStore(Store);
