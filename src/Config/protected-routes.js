import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const Auth = ({ Component }) => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export const AdminAuth = ({ Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  return isAuthenticated ? (
    user.role === "admin" ? (
      <Component />
    ) : (
      <Navigate to="/404" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export const UserAuth = ({ Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  return isAuthenticated ? (
    user.role === "user" ? (
      <Component />
    ) : (
      <Navigate to="/404" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

