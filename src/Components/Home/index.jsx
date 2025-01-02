import "./index.css";

import Header from "../Header/homeHeader";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const token = Cookies.get("manager");
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const controller = new AbortController();
  const signal = controller.signal;

  const getData = async () => {
    try {
      setStatus(apiStatus.loading);
      const url = "https://salary-manger-backend.onrender.com/profile";
      // const url = "http://localhost:8091/profile";

      const fetchdata = await fetch(url, { signal, ...options });
      const data = await fetchdata.json();
      console.log(data);

      if (fetchdata.ok) {
        setUserinfo(data);
        setStatus(apiStatus.success);
      } else {
        setStatus(apiStatus.failure);
        toast.error("something went wrong");
        // Cookies.remove("manager");
        // navigate("/login");
      }
    } catch (error) {
      setStatus(apiStatus.failure);
      if (error.name === "AbortError") {
        setStatus(apiStatus.failure);
        toast("API aborted");
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
      controller.abort("component un mounted"); // Aborts the operation
    };
  }, []);

  const user = useMemo(() => {
    return { status, user: userinfo };
  }, [status]);

  return (
    <div className="home-main-container">
      <Toaster richColors />
      <Header status={user} />
      <RemaingSalaryPercentage status={user} />
      <RecentSpends data={user} />
      <SpendGroups data={user} />
      <FooterNav />
    </div>
  );
};

export default Home;
