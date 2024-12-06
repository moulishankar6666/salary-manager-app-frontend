import { MdSavings } from "react-icons/md";

const DaySpends = () => {
  return (
    <div className="day-spends-main-container">
      <ul>
        <li>
          <div>
            <div className="spend-type-color">
              <MdSavings size={20} />
              <p>Savings</p>
            </div>
            <h5>Invested in SIP</h5>
            <div className="spend-amount">
              <p>25%</p>
              <p>5000/-</p>
            </div>
          </div>
          <div>
            <button>Edit</button>
            <p>11:10 am</p>
          </div>
        </li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
      </ul>
    </div>
  );
};
export default DaySpends;
