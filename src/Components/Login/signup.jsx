const Signup = (props) => {
  const { active, setActive } = props.data;

  return (
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
          <input placeholder="Enter monthly salary" type="number" />
        </div>
        <button>sign up</button>
      </form>
      <div>
        <p>Did you have an account ? </p>
        <button onClick={() => setActive("SIGNIN")}>sign in</button>
      </div>
    </div>
  );
};
export default Signup;
