import "./index.css";

import Header from "../Header/homeHeader";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

import { useSelector, useDispatch } from "react-redux";
import { addUserinfo, updateStatus } from "../../Redux/userInfoSlice";

import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const userinfo = useSelector((state) => state.userinfo.value.data);
  const status = useSelector((state) => state.userinfo.value.status);
  // const [userinfo, setUserinfo] = useState(
  //   useSelector((state) => state.userinfo.value.data)
  // );
  // const [status, setStatus] = useState(
  //   useSelector((state) => state.userinfo.value.status)
  // );

  const dispatch = useDispatch();

  const controller = new AbortController();
  const signal = controller.signal;

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const token = Cookies.get("manager");

  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const getData = async () => {
    try {
      dispatch(updateStatus(apiStatus.loading));
      const url = `https://salary-manger-backend.onrender.com/profile/${month}-${year}`;
      // const url = `http://localhost:8091/profile/${month}-${year}`;

      const fetchdata = await fetch(url, { signal, ...options });
      const data = await fetchdata.json();
      if (fetchdata.ok) {
        dispatch(addUserinfo(data));
        dispatch(updateStatus(apiStatus.success));
      }
    } catch (error) {
      dispatch(updateStatus(apiStatus.failure));
      if (error.name === "AbortError") {
        dispatch(updateStatus(apiStatus.failure));
        toast.error("API aborted");
      } else {
        toast.error(
          error.message === "Failed to fetch"
            ? "Check your Internet connection"
            : error.message
        );
      }
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setTimeout(() => {
        controller.abort("component un mounted"); // Aborts the operation
      }, 5000);
    };
  }, []);

  const user = { status, user: userinfo };

  return (
    <div className="home-main-container">
      <Toaster richColors />
      <Header status={user} />
      <RemaingSalaryPercentage status={user} />
      <RecentSpends data={{ user, getData }} />
      <SpendGroups data={user} />
      <FooterNav />
    </div>
  );
};

export default Home;
