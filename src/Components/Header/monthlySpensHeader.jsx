import { Link } from "react-router";

import { IoArrowBackCircle } from "react-icons/io5";
import { IoMdRefreshCircle } from "react-icons/io";

const MonthlySpendsHeader = (props) => {
  const [month, setMonth, getSpends] = props.date;

  const setSelectMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="monthly-spends-main-container">
      <button aria-label="arrowback-button">
        <Link aria-label="arrowback-button" to="/home">
          <IoArrowBackCircle />
        </Link>
      </button>

      <h3>Month wise spends</h3>

      <div className="header-right">
        <div className="refresh-container">
          <button aria-label="arrowback-button" onClick={getSpends}>
            <IoMdRefreshCircle size={25} />
          </button>
          <p>Refresh</p>
        </div>

        <input
          id="selectmonth"
          className="select-month"
          value={month}
          onChange={setSelectMonth}
          type="month"
        />
      </div>
    </div>
  );
};

export default MonthlySpendsHeader;
