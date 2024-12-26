import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const RemaingSalaryPercentage = (props) => {
  const { status, user } = props.status;

  const success = () => {
    const { totalamount, userInfo } = user;
    const { salary } = userInfo;
    const deg = totalamount / salary;
    return (
      <div
        className="salary-percentage-container"
        style={{
          background: `conic-gradient(
        #fff ${deg * 360}deg,
        #80808067 90deg
      )`,
        }}
      >
        <div className="salary-percentage-inner-container">
          <p>{`${parseInt(deg * 100)}%`}</p>
        </div>
      </div>
    );
  };

  const loading = () => {
    return (
      <div
        className="salary-percentage-container"
        style={{
          background: `conic-gradient(
          #fff ${360}deg,
          #80808067 90deg
        )`,
        }}
      >
        <div className="salary-percentage-inner-container">
          <p>wait...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="remaing-salary-percentage-main-container">
      <div className="remaing-salary-container-content">
        <p>
          This month your <br /> Spended salary %
        </p>
        <Link className="link" to="/monthlyspends">
          <button>ViewAll Spends</button>
        </Link>
      </div>
      <div className="salary-percentage-main-container">
        {status === apiStatus.success ? success() : loading()}
        <button>
          <IoIosMore />
        </button>
      </div>
    </div>
  );
};

export default RemaingSalaryPercentage;
