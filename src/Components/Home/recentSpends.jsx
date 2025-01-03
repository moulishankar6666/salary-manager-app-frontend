import { MdSavings } from "react-icons/md";
import SpendItem from "../SpendItem";
import Loader from "../Loader";
// import { IoFastFood } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const RecentSpends = (props) => {
  const { user, getData } = props.data;
  const { status } = user;
  const { userSpends } = user.user;

  const onSuccess = () => {
    return (
      <>
        {userSpends.length > 0 ? (
          userSpends.map((each) => {
            const { spendid, spendtype, spendname, amount, datetime } = each;
            return (
              <SpendItem
                key={spendid}
                item={{ spendtype, spendname, amount, datetime }}
              />
            );
          })
        ) : (
          <li className="center-the-content">
            <p>No recent spends</p>
          </li>
        )}
      </>
    );
  };
  const onLoader = () => {
    return (
      <li className="center-the-content">
        <Loader />
      </li>
    );
  };
  const onFailure = () => {
    return (
      <li className="center-the-content">
        <button onClick={getData}>Retry</button>
      </li>
    );
  };

  const onrender = () => {
    switch (status) {
      case apiStatus.success:
        return onSuccess();
      case apiStatus.loading:
        return onLoader();
      case apiStatus.failure:
        return onFailure();
      default:
        break;
    }
  };

  return (
    <div className="recent-spends-main-container">
      <h3>Recent Spends</h3>
      <ul>{onrender()}</ul>
    </div>
  );
};
export default RecentSpends;
