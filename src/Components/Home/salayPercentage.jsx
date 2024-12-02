import { IoIosMore } from "react-icons/io";

const RemaingSalaryPercentage = () => {
  return (
    <div className="remaing-salary-percentage-main-container">
      <div className="remaing-salary-container-content">
        <p>
          This month your <br /> remaining salary
        </p>
        <button>ViewAll Spends</button>
      </div>
      <div className="salary-percentage-main-container">
        <div className="salary-percentage-container">
          <div className="salary-percentage-inner-container">
            <p>85%</p>
          </div>
        </div>
        <button>
          <IoIosMore />
        </button>
      </div>
    </div>
  );
};

export default RemaingSalaryPercentage;
