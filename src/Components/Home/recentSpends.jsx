import { MdSavings } from "react-icons/md";
import SpendItem from "../SpendItem";
import Loader from "../Loader";
// import { IoFastFood } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";

const RecentSpends = (props) => {
  const { user, status } = props.data;
  const { userSpends } = user;
  return (
    <div className="recent-spends-main-container">
      <h3>Recent Spends</h3>
      <ul>
        {status === "SUCCESS" ? (
          userSpends.map((item) => <SpendItem item={item} />)
        ) : (
          <div className="center-the-content">
            <Loader />
          </div>
        )}
        {/* <li>
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
        </li> */}
      </ul>
    </div>
  );
};
export default RecentSpends;
