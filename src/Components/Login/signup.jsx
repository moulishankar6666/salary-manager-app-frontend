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

const Signup = (props) => {
  const { active, setActive } = props.data;
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [monthsalary, setmonthsalary] = useState("");
  const [status, setStatus] = useState(apiStatus.success);

  const insertUserData = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        fullname,
        salary: monthsalary,
      }),
    };
    try {
      setStatus(apiStatus.loading);
      const url = "https://salary-manger-backend.onrender.com/signup";
      // const url = "http://localhost:8091/signup";
      const response = await fetch(url, options);

      const data = await response.json();

      if (response.ok) {
        setStatus(apiStatus.success);
        toast.success(data.response);
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
  };

  const onSingnup = (e) => {
    e.preventDefault();

    if (fullname && username && password && monthsalary) {
      if (!username.endsWith("@gmail.com")) {
        toast.error("Enter Valid Gmail Address");
      } else if (password.length < 8) {
        toast.error("Password length must be 8 or more");
      } else if (monthsalary <= 0) {
        toast.error("Salary must be in postive value");
      } else {
        insertUserData();
      }
    } else {
      toast.error("Fill all fields");
    }
  };

  return (
    <div className={`signup-card ${active === "SIGNUP" ? "show" : "hide"}`}>
      <form onSubmit={onSingnup}>
        <h1>Sign Up</h1>
        <div>
          <label>FULLNAME</label>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div>
          <label>USERNAME</label>
          <input
            value={username}
            onChange={(e) => setusername(e.target.value.toLowerCase())}
            placeholder="Enter your Gmail id"
            type="email"
          />
        </div>
        <div>
          <label>PASSWORD</label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter password"
            type="password"
          />
        </div>
        <div>
          <label>MONTH-SALARY</label>
          <input
            value={monthsalary}
            onChange={(e) => setmonthsalary(e.target.value)}
            placeholder="Enter your monthly salary"
            type="number"
          />
        </div>
        <button type="submit">
          {status === apiStatus.loading ? "Creating..." : "sign up"}
        </button>
      </form>
      <div>
        <p>Did you have an account ? </p>
        <button onClick={() => setActive("SIGNIN")}>sign in</button>
      </div>
    </div>
  );
};
export default Signup;
