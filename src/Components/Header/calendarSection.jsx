import "./index.css";

import { IoNotifications } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";

import { Link } from "react-router";

const CalendarSectionHeader = () => {
  return (
    <div className="calendar-section-header-main-container">
      <button>
        <Link to="/home">
          <IoArrowBackCircle />
        </Link>
      </button>
      <h3>DayWise Spends</h3>
      <button>{<IoNotifications />}</button>
    </div>
  );
};
export default CalendarSectionHeader;
