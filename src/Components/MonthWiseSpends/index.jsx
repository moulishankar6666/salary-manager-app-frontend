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
    async function getspends() {
      setStatus(apiStatus.loading);
      const data = await fetch(
        `https://salary-manger-backend.onrender.com/monthspends/${month}`,
        options
      );
      const response = await data.json();
      if (data.ok) {
        setMonthspends(response.response);
        console.log("useeffect", response.response);
        setStatus(apiStatus.success);
      } else {
        setError(response.error);
        setStatus(apiStatus.failure);
      }
    }
    getspends();
  }, [month]);

  const loading = () => {
    return <p>Loading...</p>;
  };
  alert(error);
  const success = () => {
    return (
      <>
        {monthspends.map((each) => {
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
        })}
      </>
    );
  };

  const failure = () => {
    return <p>something went wrong please check</p>;
  };

  const renderSpends = (sta) => {
    switch (sta) {
      case apiStatus.loading:
        return loading();
      case apiStatus.success:
        return success();
      case apiStatus.failure:
        return failure();
      default:
        break;
    }
  };

  return (
    <div className="month-wise-spends-main-container">
      <MonthlySpendsHeader date={[month, setMonth]} />
      <div className="monthly-list-of-spends-container">
        <ul>
          {monthspends.length > 0
            ? renderSpends(status)
            : "No spends this months"}
        </ul>
      </div>
      <FooterNav />
    </div>
  );
};
export default MonthWiseSpends;
