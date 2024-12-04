import "./index.css";

import CalendarSectionHeader from "../Header/calendarSection";
import FooterNav from "../Footer";
import CalendarDates from "./calendarDates";

const Calendar = () => {
  return (
    <div className="calendar-section-main-container">
      <CalendarSectionHeader />
      <CalendarDates />
      <FooterNav />
    </div>
  );
};
export default Calendar;
