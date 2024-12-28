import { MdSavings } from "react-icons/md";
// import { IoFastFood } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";

const RecentSpends = () => {
  return (
    <div className="recent-spends-main-container">
      <h3>Recent Spends</h3>
      <ul>
        <li>
          <div className="spend-type-color">
            <p>Savings</p>
            <MdSavings />
          </div>
          <p className="spend-name">Invested in SIP</p>
          <div className="spend-amount">
            <p>5000</p>
            <p>25%</p>
          </div>
        </li>
        <li>
          <div className="spend-type-color">
            <p>Savings</p>
            <MdSavings />
          </div>
          <p className="spend-name">Invested in SIP</p>
          <div className="spend-amount">
            <p>5000</p>
            <p>25%</p>
          </div>
        </li>
        <li>
          <div className="spend-type-color">
            <p>Savings</p>
            <MdSavings />
          </div>
          <p className="spend-name">Invested in SIP</p>
          <div className="spend-amount">
            <p>5000</p>
            <p>25%</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default RecentSpends;
