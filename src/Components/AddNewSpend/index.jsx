import "./index.css";

import windowPoster from "../assets/destop poster.png";

import FooterNav from "../Footer";
import { useState } from "react";
import Loader from "../Loader";

import toast, { Toaster } from "react-hot-toast";

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
  const [amount, setamount] = useState("");
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
    const isDigit = enteredAmount > 0;

    if (isDigit) {
      setamount(e.target.value);
      setError("");
    } else if (e.target.value.length > 0) {
      setError("Please Enter Positive Value");
      setamount(e.target.value);
      toast.error("Please Enter Positive Value");
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
            setamount("");
            setError("");
            setStatus(apiStatus.success);
            toast.success("Added Successfully");
          }
        } else {
          setError("Fill all fields");
          toast.error("Fill all fields");
        }
      }
    } catch (error) {
      toast.error(
        error.message === "Failed to fetch"
          ? "Check your Internet connection"
          : error.message
      );
      setError(
        error.message === "Failed to fetch"
          ? "Check your Internet connection"
          : error.message
      );
      setStatus(apiStatus.failure);
    }
  };

  return (
    <>
      <div className="add-new-spend-main-container">
        <Toaster richColors />
        <form onSubmit={onSubmitNewSpend}>
          <h1>ADD NEW SPEND</h1>
          <div>
            <label htmlFor="nameofspend">NAME OF SPEND</label>
            <input
              id="nameofspend"
              placeholder="Enter name of spend"
              className="input"
              value={spendname}
              onChange={(e) => setspendname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="typeOfSpend">TYPE OF SPEND</label>
            <select
              id="typeOfSpend"
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
            <label htmlFor="whenYouSpend">WHEN YOU SPEND ?</label>
            <input
              id="whenYouSpend"
              value={time}
              onChange={(e) => settime(e.target.value)}
              className="input"
              type="time"
            />
          </div>
          <div>
            <label id="howMuchYouSpend">HOW MUCH YOU SPEND ?</label>
            <input
              id="howMuchYouSpend"
              value={amount}
              onChange={setCheckedamount}
              placeholder="Enter amount"
              className="input"
              type="number"
            />
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
