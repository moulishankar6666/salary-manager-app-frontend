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

  useEffect(() => {
    try {
      async function getspends() {
        setStatus(apiStatus.loading);
        const data = await fetch(
          `https://salary-manager-app-frontend.onrender.com/monthspends/${month}`,
          options
        );
        console.log(data);
        if (data.ok) {
          const response = await data.json();
          setMonthspends(response.response);
          setStatus(apiStatus.success);
        }
        if (data.status === 404) {
          const response = await data.json();
          setError(response.error);
          setStatus(apiStatus.failure);
        }
      }
      getspends();
    } catch (error) {
      setError(error.message);
      setStatus(apiStatus.failure);
    }
  }, [month]);

  const loading = () => {
    return <p className="center-the-content">Loading...</p>;
  };

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
                  <button>Delete</button>
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
    alert(error);
    return (
      <p className="center-the-content">something went wrong please check</p>
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
      <MonthlySpendsHeader date={[month, setMonth]} />
      <div className="monthly-list-of-spends-container">
        <ul>{renderSpends()}</ul>
      </div>
      <FooterNav />
    </div>
  );
};
export default MonthWiseSpends;
