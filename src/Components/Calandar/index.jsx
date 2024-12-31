import "./index.css";

import CalendarSectionHeader from "../Header/calendarSection";
import FooterNav from "../Footer";
import CalendarDates from "./calendarDates";
import DaySpends from "./daySpends.jsx";

import Cookies from "js-cookie";

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

  const token = Cookies.get("manager");

  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const Controller = new AbortController();
  const signal = Controller.signal;

  const getDaySpends = async () => {
    setStatus(apiStatus.loading);
    try {
      const data = await fetch(
        `https://salary-manger-backend.onrender.com/dayspends/${activeDate[2]}`,
        { signal, ...options }
      );
      const response = await data.json();

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
    return () => {
      setTimeout(() => {
        Controller.abort(); // Aborts the operation
      }, 5000);
    };
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
