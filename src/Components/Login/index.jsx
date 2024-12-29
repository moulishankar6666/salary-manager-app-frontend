import { useState } from "react";
import "./index.css";

const Login = () => {
  const [active, setActive] = useState("SIGNIN");

  return (
    <div className="main-signin-container">
      <p className="note">Hover me SignIn / SignUp</p>

      <div className="signin-container">
        <div className={`signin-card ${active === "SIGNIN" ? "show" : "hide"}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>
            <div>
              <label htmlFor="username">USERNAME</label>
              <input placeholder="Enter Username" type="email" />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <input placeholder="Enter Password" type="email" />
            </div>
            <button type="submit">sign in</button>
          </form>
          <div className="signup">
            <p>Did't you have an account ? </p>
            <button onClick={() => setActive("SIGNOUT")}>sign up</button>
          </div>
        </div>
        <div
          className={`signout-card ${active === "SIGNOUT" ? "show" : "hide"}`}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign Up</h1>
            <button onClick={() => setActive("SIGNIN")}>sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
