import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import Cookies from "js-cookie";
const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Signin = (props) => {
  const { active, setActive } = props.data;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(apiStatus.Initial);

  const navigate = useNavigate();

  // const controller = new AbortController();
  // const signal = controller.signal;

  const onSignin = async (e) => {
    e.preventDefault();

    if (username.endsWith("@gmail.com")) {
      if (password) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username, password }),
        };
        try {
          setStatus(apiStatus.loading);

          const response = await fetch(
            "https://salary-manger-backend.onrender.com/signin",
            options
          );

          const data = await response.json();

          if (response.ok) {
            setStatus(apiStatus.success);
            toast.success("Sign In Successfully");
            Cookies.set("manager", data.token, { expires: 30 });
            navigate("/home");
          } else {
            toast.error(data.error);
            setStatus(apiStatus.failure);
          }
        } catch (error) {
          setStatus(apiStatus.failure);
          toast.error(
            error.message === "Failed to fetch"
              ? "Check your Internet connection"
              : error.message
          );
        }
      } else {
        toast.error("Enter the password");
      }
    } else {
      toast.error("Enter the valid Email Address");
    }
  };

  return (
    <div className={`signin-card ${active === "SIGNIN" ? "show" : "hide"}`}>
      <form onSubmit={onSignin}>
        <h1>Sign In</h1>
        <div>
          <label htmlFor="username">USERNAME</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            placeholder="Enter Username"
            type="email"
          />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            type="password"
          />
        </div>
        <button
          style={{
            backgroundColor: `${
              status === apiStatus.loading ? "grey" : "#2e0776"
            }`,
          }}
          disabled={status === apiStatus.loading ? true : false}
          type="submit"
        >
          {`${status === apiStatus.loading ? "Verifying..." : "Sign in"}`}
        </button>
      </form>
      <div className="signup">
        <p>Did't you have an account ? </p>
        <button
          disabled={status === apiStatus.loading ? true : false}
          onClick={() => setActive("SIGNUP")}
        >
          sign up
        </button>
      </div>
    </div>
  );
};
export default Signin;
