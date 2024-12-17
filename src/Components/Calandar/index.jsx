import "./index.css";

import CalendarSectionHeader from "../Header/calendarSection";
import FooterNav from "../Footer";
import CalendarDates from "./calendarDates";
import DaySpends from "./daySpends.jsx";

import { useState, useEffect } from "react";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Calendar = () => {
  const [dayspendsList, setDaySpendsList] = useState([]);
  const [status, setStatus] = useState(apiStatus.Initial);
  const [activeDate, setActiveDate] = useState(
    new Date().toString().split(" ")
  );

  const options = {
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb3VsaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCcEd3VUpnOVp3N3o5Q2J1ckozVGl1Y3lpN2F6NkxYMlhjdlFIMUFvRUxHcXBtYVpxemkuNiIsInNhbGFyeSI6NTAwMDAsImZ1bGxuYW1lIjoibW91bGkgc2hhbmthciIsImlhdCI6MTczMzgyNDU3N30.SGeezmerUp23BT5BUSWVyzrSUluInw8jVckTv6EAuvw",
    },
  };

  const getDaySpends = async () => {
    setStatus(apiStatus.loading);
    try {
      const data = await fetch(
        `https://salary-manger-backend.onrender.com/dayspends/${activeDate[2]}`,
        options
      );
      const response = await data.json();
      console.log(response);
      if (data.ok) {
        setDaySpendsList(response.response);
        setStatus(apiStatus.success);
      }
    } catch (err) {
      setStatus(apiStatus.failure);
    }
  };

  useEffect(() => {
    getDaySpends();
  }, [activeDate]);

  return (
    <div className="calendar-section-main-container">
      <CalendarSectionHeader />
      <CalendarDates selectedDate={{ activeDate, setActiveDate }} />
      <DaySpends data={{ status, dayspendsList, getDaySpends }} />
      <FooterNav />
    </div>
  );
};
export default Calendar;
