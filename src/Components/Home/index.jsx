import "./index.css";

import Header from "../Header/homeHeader";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { useCallback, useEffect, useMemo, useState } from "react";

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [userinfo, setUserinfo] = useState({});
  const [status, setStatus] = useState(apiStatus.Initial);

  const token = Cookies.get("manager");
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const controller = new AbortController();
  const signal = controller.signal;

  const getData = useCallback(async () => {
    try {
      setStatus(apiStatus.loading);

      const fetchdata = await fetch(
        "https://salary-manger-backend.onrender.com/profile",
        { signal, ...options }
      );
      const data = await fetchdata.json();
      console.log(data, "home");
      setUserinfo(data);
      setStatus(apiStatus.success);
    } catch (error) {
      setStatus(apiStatus.failure);

      if (error.name === "AbortError") {
        setStatus(apiStatus.failure);
        toast("Please wait...");
      } else {
        toast.error(
          error.message === "Failed to fetch"
            ? "Check your Internet connection"
            : error.message
        );
      }
    }
  }, []);

  useEffect(() => {
    getData();

    return () => {
      setTimeout(() => {
        controller.abort(); // Aborts the operation
      }, 10000);
    };
  }, []);

  const user = useMemo(() => {
    return { status, user: userinfo };
  }, [status, userinfo]);

  return (
    <div className="home-main-container">
      <Toaster richColors />
      <Header status={user} />
      <RemaingSalaryPercentage status={user} />
      <RecentSpends />
      <SpendGroups data={user} />
      <FooterNav />
    </div>
  );
};

export default Home;
