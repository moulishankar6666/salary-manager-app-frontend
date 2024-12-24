import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const RemaingSalaryPercentage = (props) => {
  const { status } = props.status;
  return (
    <div className="remaing-salary-percentage-main-container">
      <div className="remaing-salary-container-content">
        <p>
          This month your <br /> Remaining salary
        </p>
        <Link className="link" to="/monthlyspends">
          <button>ViewAll Spends</button>
        </Link>
      </div>
      <div className="salary-percentage-main-container">
        {status === apiStatus.success ? (
          <div className="salary-percentage-container">
            <div className="salary-percentage-inner-container">
              <p>85%</p>
            </div>
          </div>
        ) : (
          "0%"
        )}
        <button>
          <IoIosMore />
        </button>
      </div>
    </div>
  );
};

export default RemaingSalaryPercentage;
