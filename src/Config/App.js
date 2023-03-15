import Layout from "../Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/General/Home";
import _404 from "../Pages/General/_404";
import RequestEmailToken from "../Pages/General/RequestEmailToken";
import Login from "../Pages/General/Login";
import ResetPassword from "../Pages/General/ResetPassword";
import Register from "../Pages/General/Register";
import VerifyEmail from "../Pages/General/VerifyEmail";
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
            <Route path="*" element={<_404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
