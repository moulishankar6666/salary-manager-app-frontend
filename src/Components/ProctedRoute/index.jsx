import Cookies from "js-cookie";

import { Navigate } from "react-router-dom";

const ProctedRoute = (props) => {
  const isLogin = Cookies.get("manager");
  if (isLogin) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProctedRoute;
