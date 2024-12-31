import { useState } from "react";

import { Toaster } from "react-hot-toast";

import Signin from "./signin";
import Signup from "./signup";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  const [active, setActive] = useState("SIGNIN");
  const appCookie = Cookies.get("manager");

  return (
    <>
      {appCookie === undefined ? (
        <div className="main-signin-out-container">
          <Toaster richColors />
          <div className="signin-out-container">
            <Signin data={{ active, setActive }} />
            <Signup data={{ active, setActive }} />
          </div>
        </div>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};
export default Login;
