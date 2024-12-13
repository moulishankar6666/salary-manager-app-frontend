import SpendItem from "../SpendItem";

const DaySpends = () => {
  const spendname = "ate dosa";
  return (
    <div className="day-spends-main-container">
      <ul>
        <SpendItem item={{ spendname }} />
      </ul>
    </div>
  );
};
export default DaySpends;
