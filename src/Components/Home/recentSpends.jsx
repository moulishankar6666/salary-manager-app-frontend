import { MdSavings } from "react-icons/md";
import SpendItem from "../SpendItem";
import Loader from "../Loader";
// import { IoFastFood } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";

const RecentSpends = (props) => {
  const { user, getData } = props.data;
  const { status } = user;
  const { userSpends } = user.user;

  return (
    <div className="recent-spends-main-container">
      <h3>Recent Spends</h3>
      <ul>
        {status === "SUCCESS" && userSpends.length > 0 ? (
          userSpends.map((each) => {
            const { spendid, spendtype, spendname, amount, datetime } = each;
            return (
              <SpendItem
                key={spendid}
                item={{ spendtype, spendname, amount, datetime }}
              />
            );
          })
        ) : status === "LOADING" ? (
          <li className="center-the-content">
            <Loader />
          </li>
        ) : (
          <li className="center-the-content">
            <button onClick={getData}>Retry</button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default RecentSpends;
