import "./index.css";

import CalendarSectionHeader from "../Header/calendarSection";
import FooterNav from "../Footer";
import CalendarDates from "./calendarDates";
import DaySpends from "./daySpends.jsx";

const Calendar = () => {
  return (
    <div className="calendar-section-main-container">
      <CalendarSectionHeader />
      <CalendarDates />
      <DaySpends />
      <FooterNav />
    </div>
  );
};
export default Calendar;
