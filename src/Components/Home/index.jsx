import "./index.css";

import Header from "../Header/homeHeader";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

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
  const [userinfo, setUserinfo] = useState({});
  const [status, setStatus] = useState(apiStatus.Initial);

  // const navigate = useNavigate();
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
      setStatus(apiStatus.loading);
      const url = `https://salary-manger-backend.onrender.com/profile/${month}-${year}`;
      // const url = `http://localhost:8091/profile/${month}-${year}`;

      const fetchdata = await fetch(url, { signal, ...options });
      const data = await fetchdata.json();
      if (fetchdata.ok) {
        setUserinfo(data);
        setStatus(apiStatus.success);
      }
    } catch (error) {
      setStatus(apiStatus.failure);
      if (error.name === "AbortError") {
        setStatus(apiStatus.failure);
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
      <RecentSpends data={{ getData, user }} />
      <SpendGroups data={user} />
      <FooterNav />
    </div>
  );
};

export default Home;
