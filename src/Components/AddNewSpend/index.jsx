import "./index.css";

import windowPoster from "../assets/destop poster.png";

import FooterNav from "../Footer";
import { useState } from "react";
import Loader from "../Loader";

import Cookies from "js-cookie";

import toast, { Toaster } from "react-hot-toast";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const AddSpend = () => {
  const today = new Date();
  // states
  const [spendtype, setspendtype] = useState("House Expences");
  const [spendname, setspendname] = useState("");
  const [amount, setamount] = useState("");
  const [time, settime] = useState(
    `${today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()}:${
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    }`
  );
  const [errortxt, setError] = useState("");
  const [status, setStatus] = useState(apiStatus.Initial);

  //converting present time to user selected time

  const userdatetime = () => {
    const Time = time.split(":");
    const selectedDT = new Date(
      today.getFullYear(), //year
      today.getMonth(), //month
      today.getDate(), //date
      Time[0], //hour
      Time[1] //minute
    );

    const Month = JSON.stringify(selectedDT.getMonth() + 1);
    const Day = JSON.stringify(selectedDT.getDate());
    const FullTime = selectedDT.toString().split(" ")[4];

    return `${selectedDT.getFullYear()}-${
      Month.length === 1 ? `0${Month}` : Month
    }-${Day.length === 1 ? `0${Day}` : Day} ${FullTime}`;
  };

  const datetime = userdatetime();

  const token = Cookies.get("manager");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
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

  const controller = new AbortController();
  const signal = controller.signal;

  const onSubmitNewSpend = async (e) => {
    e.preventDefault();
    try {
      if (!errortxt) {
        if (spendname && spendtype && time && amount) {
          setStatus(apiStatus.loading);
          const url = "https://salary-manger-backend.onrender.com/addspend";
          // const url = "http://localhost:8091/addspend";
          const data = await fetch(url, { signal, ...options });

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
