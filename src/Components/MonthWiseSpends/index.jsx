import "./index.css";

import FooterNav from "../Footer";
import MonthlySpendsHeader from "../Header/monthlySpensHeader";
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
  const [month, setMonth] = useState(`${year.slice(0, 4)}-${presentmonth}`);
  const [status, setStatus] = useState(apiStatus.Initial);
  const [error, setError] = useState("");

  //options for to get data from database
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb3VsaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCcEd3VUpnOVp3N3o5Q2J1ckozVGl1Y3lpN2F6NkxYMlhjdlFIMUFvRUxHcXBtYVpxemkuNiIsInNhbGFyeSI6NTAwMDAsImZ1bGxuYW1lIjoibW91bGkgc2hhbmthciIsImlhdCI6MTczMzgyNDU3N30.SGeezmerUp23BT5BUSWVyzrSUluInw8jVckTv6EAuvw",
    },
  };

  const getspends = async () => {
    setStatus(apiStatus.loading);
    try {
      const data = await fetch(
        `https://salary-manger-backend.onrender.com/monthspends/${month}`,
        options
      );
      const response = await data.json();
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
        <div className="Loader-spinner-outer">
          <div className="loader-spinner-inner">0</div>
        </div>
      </div>
    );
  };

  const onDeleteById = () => [];

  const success = () => {
    return (
      <>
        {monthspends.length > 0 ? (
          monthspends.map((each) => {
            const { spendid, spendtype, spendname, amount, datetime } = each;
            return (
              <li key={spendid}>
                <div>
                  <div className="spend-type-color">
                    {/* <MdSavings size={20} /> */}
                    <p>{spendtype}</p>
                  </div>
                  <h5>{spendname}</h5>
                  <div className="spend-amount">
                    <p>{`${amount}`}</p>
                    <p>(25%)</p>
                  </div>
                </div>
                <div className="edit-button-container">
                  <p>{datetime}</p>
                  <button onClick={onDeleteById}>Delete</button>
                </div>
              </li>
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
