import "./index.css";

import windowPoster from "../assets/destop poster.png";

import FooterNav from "../Footer";
import { useState } from "react";
import Loader from "../Loader";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const today = new Date();

const AddSpend = () => {
  const [spendtype, setspendtype] = useState("House Expences");
  const [spendname, setspendname] = useState("");
  const [amount, setamout] = useState("");
  const [time, settime] = useState(today.toString().split(" ")[4].slice(0, 5));
  const [error, setError] = useState("");
  const [status, setStatus] = useState(apiStatus.Initial);

  //converting present time to user selected time

  const userdatetime = () => {
    const date = today.toLocaleString().split(" ")[0].split("/");
    const selectedTime = time.split(":");
    const userSelectedDatetime = new Date(
      date[2].slice(0, 4), //year
      date[0] - 1, //month
      date[1], //date
      selectedTime[0], //hour
      selectedTime[1] //minute
    );
    const DT = userSelectedDatetime.toString().split(" ");
    const DTLocal = userSelectedDatetime
      .toLocaleString()
      .split(" ")[0]
      .split("/");

    return `${DTLocal[2].slice(0, 4)}-${DTLocal[0]}-${DTLocal[1]} ${DT[4]}`;
  };

  const datetime = userdatetime();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb3VsaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCcEd3VUpnOVp3N3o5Q2J1ckozVGl1Y3lpN2F6NkxYMlhjdlFIMUFvRUxHcXBtYVpxemkuNiIsInNhbGFyeSI6NTAwMDAsImZ1bGxuYW1lIjoibW91bGkgc2hhbmthciIsImlhdCI6MTczMzgyNDU3N30.SGeezmerUp23BT5BUSWVyzrSUluInw8jVckTv6EAuvw",
    },
    body: JSON.stringify({
      spendname,
      spendtype,
      amount,
      datetime,
    }),
  };

  const setCheckedamount = (e) => {
    const enteredAmount = e.target.value;
    const isDigit = enteredAmount
      .split("")
      .every((a) => Number.isInteger(parseInt(a)));
    if (isDigit) {
      setamout(e.target.value);
      setError("");
    } else if (e.target.value.length > 0) {
      setError("Enter amount in Digits");
      setamout(e.target.value);
    }
  };

  const onSubmitNewSpend = async (e) => {
    e.preventDefault();
    try {
      if (!error) {
        if (spendname && spendtype && time && amount) {
          setStatus(apiStatus.loading);
          const data = await fetch(
            "https://salary-manger-backend.onrender.com/addspend",
            options
          );

          if (data.ok) {
            settime(today.toString().split(" ")[4].slice(0, 5));
            setspendname("");
            setamout("");
            setError("");
            setStatus(apiStatus.success);
            alert("Added Successfully");
          }
        } else {
          setError("Fill all fields");
        }
      }
    } catch (error) {
      setError(
        error.message === "Failed to fetch"
          ? "Check your Internet connection"
          : error.message
      );
    }
  };

  return (
    <>
      <div className="add-new-spend-main-container">
        <form onSubmit={onSubmitNewSpend}>
          <h1>ADD NEW SPEND</h1>
          <div>
            <label>NAME OF SPEND</label>
            <input
              placeholder="Enter name of spend"
              className="input"
              value={spendname}
              onChange={(e) => setspendname(e.target.value)}
            />
          </div>
          <div>
            <label>TYPE OF SPEND</label>
            <select
              value={spendtype}
              onChange={(e) => setspendtype(e.target.value)}
              className="input"
            >
              <option value="House Expences">House Expences</option>
              <option value="Savings">Savings</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label>WHEN YOU SPEND ?</label>
            <input
              value={time}
              onChange={(e) => settime(e.target.value)}
              className="input"
              type="time"
            />
          </div>
          <div>
            <label>HOW MUCH YOU SPEND ?</label>
            <input
              value={amount}
              onChange={setCheckedamount}
              placeholder="Enter amount"
              className="input"
              type="text"
            />
            {error && <p className="error">{`* ${error}`}</p>}
          </div>
          <button type="submit">ADD</button>
        </form>
        <img src={windowPoster} alt="window-poster" />
        <FooterNav />
      </div>
      {status === apiStatus.loading && (
        <div className="add-new-spend-loader-container">
          <Loader />
        </div>
      )}
    </>
  );
};
export default AddSpend;
