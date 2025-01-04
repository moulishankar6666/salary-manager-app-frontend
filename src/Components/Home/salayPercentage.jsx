import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { Popup } from "reactjs-popup";
import RuleImg from "../assets/budget rule.jpg";
const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};
const today = new Date();
const month = today.toLocaleString("default", { month: "long" });

const RemaingSalaryPercentage = (props) => {
  const { status, user } = props.status;

  const success = () => {
    const { totalamount, userInfo } = user;
    const { salary } = userInfo;
    const deg = totalamount[0] / salary;
    return (
      <div
        className="salary-percentage-container"
        style={{
          backgroundImage: `conic-gradient(#fff 0deg, #fff ${
            deg * 360
          }deg, #80808067 ${deg * 360}deg
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

  const salaryDivision = () => {
    return (
      <div className="salary-division-popup">
        <Popup
          modal
          trigger={
            <button title="show salary division" aria-label="Aria moreinfo">
              <IoIosMore />
            </button>
          }
        >
          {(close) => (
            <div>
              <div className="popup-main-container">
                <img src={RuleImg} alt="buget rule" />
                <p>
                  <b>*</b>Try to implement 90% this Budget Rule
                </p>
                <button className="popup-close" onClick={close}>
                  close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  };

  return (
    <div className="remaing-salary-percentage-main-container">
      <div className="remaing-salary-container-content">
        <p>
          <b>{month}</b> month your <br /> Spended salary %
        </p>
        <Link className="link" to="/monthlyspends">
          <button>ViewAll Spends</button>
        </Link>
      </div>
      <div className="salary-percentage-main-container">
        {status === apiStatus.success ? success() : loading()}
        {salaryDivision()}
      </div>
    </div>
  );
};

export default RemaingSalaryPercentage;
