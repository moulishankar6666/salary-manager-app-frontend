import "./index.css";

import FooterNav from "../Footer";
import MonthlySpendsHeader from "../Header/monthlySpensHeader";
import SpendItem from "../SpendItem";
import Loader from "../Loader";

import Cookies from "js-cookie";

//hooks
import { useEffect, useState } from "react";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const today = new Date();
const [presentmonth, , year] = today
  .toLocaleString()
  .split(" ")[0]
  .split("/")
  .slice(0, 3);

const MonthWiseSpends = () => {
  const [monthspends, setMonthspends] = useState([]);
  const [month, setMonth] = useState(
    `${year.slice(0, 4)}-${
      presentmonth.length === 1 ? `0${presentmonth}` : presentmonth
    }`
  );
  const [status, setStatus] = useState(apiStatus.Initial);
  const [error, setError] = useState("");

  //options for to get data from database
  const token = Cookies.get("manager");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getspends = async () => {
    setStatus(apiStatus.loading);
    try {
      // const url = `http://localhost:8091/monthspends/${month}`;
      const url = `https://salary-manger-backend.onrender.com/monthspends/${month}`;
      const data = await fetch(url, options);
      const response = await data.json();
      console.log(response, "month");
      if (data.ok) {
        setMonthspends(response.response);
        setStatus(apiStatus.success);
      } else {
        setError("Something went wrong");
        setStatus(apiStatus.failure);
      }
    } catch (error) {
      setError(error.message);
      setStatus(apiStatus.failure);
    }
  };

  useEffect(() => {
    getspends();
  }, [month]);

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
        {monthspends.length > 0 ? (
          monthspends.map((each) => {
            const { spendid, spendtype, spendname, amount, datetime } = each;
            return (
              <SpendItem
                key={spendid}
                item={{ spendtype, spendname, amount, datetime }}
              />
            );
          })
        ) : (
          <p className="center-the-content">No spends in this month</p>
        )}
      </>
    );
  };

  const failure = () => {
    return (
      <div className="center-the-content">
        <p>{error}</p>
        <button onClick={getspends}>Retry</button>
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
    <div className="month-wise-spends-main-container">
      <MonthlySpendsHeader date={[month, setMonth, getspends]} />
      <div className="monthly-list-of-spends-container">
        <ul>{renderSpends()}</ul>
      </div>
      <FooterNav />
    </div>
  );
};
export default MonthWiseSpends;
