import "./index.css";

import FooterNav from "../Footer";
import MonthlySpendsHeader from "../Header/monthlySpensHeader";
const MonthWiseSpends = () => {
  return (
    <div className="month-wise-spends-main-container">
      <MonthlySpendsHeader />
      <div className="monthly-list-of-spends-container">
        <ul>
          <li>list 1</li>
          <li>list 2</li>
          <li>list 3</li>
          <li>list 4</li>
        </ul>
      </div>
      <FooterNav />
    </div>
  );
};
export default MonthWiseSpends;
