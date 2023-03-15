import Layout from "../Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import _404 from "../Pages/_404";
import RequestEmailToken from "../Pages/RequestEmailToken";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";
import Register from "../Pages/Register";
import VerifyEmail from "../Pages/VerifyEmail";
import Products from "../Pages/Products";
import Orders from "../Pages/Orders";
import Cart from "../Pages/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/request-email-token"
              element={<RequestEmailToken />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<RequestEmailToken />} />
            <Route path="/products" element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="*" element={<_404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
