import SpendItem from "../SpendItem";
import Loader from "../Loader";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const DaySpends = (props) => {
  const { status, dayspendsList, getDaySpends } = props.data;

  const loading = () => {
    return (
      <div className="center-the-content">
        <Loader />
      </div>
    );
  };

  const success = () => {
    return (
      <>
        {dayspendsList.length > 0 ? (
          dayspendsList.map((each) => {
            const { spendid, spendtype, spendname, amount, datetime } = each;
            return (
              <SpendItem
                key={spendid}
                item={{ spendtype, spendname, amount, datetime }}
              />
            );
          })
        ) : (
          <p className="center-the-content">No spends in this date</p>
        )}
      </>
    );
  };

  const failure = () => {
    return (
      <div className="center-the-content">
        <p>Something went wrong</p>
        <button onClick={getDaySpends}>Retry</button>
      </div>
    );
  };

  const renderSpends = () => {
    switch (status) {
      case apiStatus.failure:
        return failure();
      case apiStatus.loading:
        return loading();
      case apiStatus.success:
        return success();
      default:
        break;
    }
  };

  return (
    <div className="day-spends-main-container">
      <ul>{renderSpends()}</ul>
    </div>
  );
};
export default DaySpends;
