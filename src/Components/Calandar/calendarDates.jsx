const CalendarDates = () => {
  const date = new Date().toString().split(" ");
  //   alert(date);

  const eachItem = (i) => {
    const day = date[2][0] === "0" ? date[2][1] : date[2];
    // alert(date);
    return (
      <li>
        <p className="month">{date[1]}</p>
        <p className="date">{day}</p>
        <p className="day">{date[0]}</p>
      </li>
    );
  };

  const allDates = () => {
    for (let i = 0; i < 30; i++) {
      eachItem(i);
    }
  };

  return <ul className="calendar-dates-main-container">{eachItem()}</ul>;
};

export default CalendarDates;
