import { useState } from "react";

const CalendarDates = () => {
  const [activeDate, setActiveDate] = useState(
    new Date().toString().split(" ")
  );

  const today = new Date(activeDate.slice(1, 4));
  const arr = [
    -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ];

  const eachItem = (i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    )
      .toString()
      .split(" ");

    const day = date[2][0] === "0" ? date[2][1] : date[2];

    const isactive = date[2] === activeDate[2] ? "True" : null;

    return (
      <li
        key={i}
        onClick={() => setActiveDate(date)}
        className={`${isactive ? "active" : "in-active"}`}
      >
        <p className="month">{date[1]}</p>
        <p className="date">{day}</p>
        <p className="day">{date[0]}</p>
      </li>
    );
  };

  return (
    <div className="calendar-dates-main-container">
      <ul>
        {arr.map((eachDate) => {
          return eachItem(eachDate);
        })}
      </ul>
      <div className="year-container">
        <p>{activeDate[3][0]}</p>
        <p>{activeDate[3][1]}</p>
        <p>{activeDate[3][2]}</p>
        <p>{activeDate[3][3]}</p>
      </div>
    </div>
  );
};

export default CalendarDates;
