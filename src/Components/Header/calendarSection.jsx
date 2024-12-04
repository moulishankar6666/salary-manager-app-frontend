import "./index.css";

import { IoNotifications } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";

const CalendarSectionHeader = () => {
  return (
    <div className="calendar-section-header-main-container">
      <button>
        <IoArrowBackCircle />
      </button>
      <h3>DayWise Spends</h3>
      <button>{<IoNotifications />}</button>
    </div>
  );
};
export default CalendarSectionHeader;
