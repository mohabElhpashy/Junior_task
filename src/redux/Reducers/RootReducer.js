import { combineReducers } from "redux";
import {
  Reducer,
  Reducer_Selected,
  Reducer_Selected_Product,
  Reducer_Currency,
  Reducer_Add_To_Shopping_Cart,
} from "./Reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["", "Categ", "S_Product", "S_cart", "CURRENCY"],
};
const rootReducer = combineReducers({
  All: Reducer,
  Categ: Reducer_Selected,
  S_Product: Reducer_Selected_Product,
  S_cart: Reducer_Add_To_Shopping_Cart,
  CURRENCY: Reducer_Currency,
});
export default persistReducer(persistConfig, rootReducer);
