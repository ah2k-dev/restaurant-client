import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { auth } from "../Redux/Reducers/authReducer";
import { products } from "../Redux/Reducers/productReducer";
import { cart } from "../Redux/Reducers/cartReducer";
import { order } from "../Redux/Reducers/orderReducer";

const reducer = combineReducers({
  auth,
  products,
  cart,
  order,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
