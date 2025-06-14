import { createStore, combineReducers } from "redux";
import shippingReducer from "./reducers/shippingReducer";

const rootReducer = combineReducers({
  shipping: shippingReducer,
});

const store = createStore(rootReducer);

export default store;
