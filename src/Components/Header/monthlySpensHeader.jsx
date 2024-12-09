import { Link } from "react-router";

import { IoArrowBackCircle } from "react-icons/io5";

// const today = new Date();
// const [presentmonth, , year] = today
//   .toLocaleString()
//   .split(" ")[0]
//   .split("/")
//   .slice(0, 3);

const MonthlySpendsHeader = (props) => {
  const [month, setMonth] = props.date;

  const setSelectMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="monthly-spends-main-container">
      <button>
        <Link to="/home">
          <IoArrowBackCircle />
        </Link>
      </button>
      <h3>Month wise spends</h3>
      <div className="select-month">
        <label htmlFor="selectmonth">Select Month</label>
        <input
          id="selectmonth"
          value={month}
          onChange={setSelectMonth}
          type="month"
        />
      </div>
    </div>
  );
};

export default MonthlySpendsHeader;
