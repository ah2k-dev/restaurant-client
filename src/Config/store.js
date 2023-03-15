import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { auth } from "../Redux/Reducers/authReducer";
import { products } from "../Redux/Reducers/productReducer";
import { cart } from "../Redux/Reducers/cartReducer";

const reducer = combineReducers({
  auth,
  products,
  cart,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
