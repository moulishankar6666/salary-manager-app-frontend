import { useState } from "react";
import sinup from "../assets/signinout.jpg";
import "./index.css";

const Login = () => {
  const [active, setActive] = useState("SIGNIN");

  return (
    <div className="main-signin-out-container">
      {/* <div className="poster-container">
        <img src={sinup} alt="img" />
      </div> */}
      <div className="signin-out-container">
        <div className={`signin-card ${active === "SIGNIN" ? "show" : "hide"}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>
            <div>
              <label htmlFor="username">*USERNAME</label>
              <input placeholder="Enter Username" type="email" />
            </div>
            <div>
              <label htmlFor="password">*PASSWORD</label>
              <input placeholder="Enter Password" type="password" />
            </div>
            <button type="submit">sign in</button>
          </form>
          <div className="signup">
            <p>Did't you have an account ? </p>
            <button onClick={() => setActive("SIGNUP")}>sign up</button>
          </div>
        </div>
        {/* SIGNUP CONTAINER */}
        <div className={`signup-card ${active === "SIGNUP" ? "show" : "hide"}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign Up</h1>
            <div>
              <label>FULLNAME</label>
              <input placeholder="Enter name" type="text" />
            </div>
            <div>
              <label>USERNAME</label>
              <input placeholder="Enter email address" type="email" />
            </div>
            <div>
              <label>PASSWORD</label>
              <input placeholder="Enter password" type="password" />
            </div>
            <div>
              <label>MONTH-SALARY</label>
              <input placeholder="Enter monthly salary" type="password" />
            </div>
            <button>sign up</button>
          </form>
          <div>
            <p>Did you have an account ? </p>
            <button onClick={() => setActive("SIGNIN")}>sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
