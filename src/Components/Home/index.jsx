import "./index.css";

import Header from "../Header/homeHeader";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

import toast, { Toaster } from "react-hot-toast";

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
  const options = {
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb3VsaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCcEd3VUpnOVp3N3o5Q2J1ckozVGl1Y3lpN2F6NkxYMlhjdlFIMUFvRUxHcXBtYVpxemkuNiIsInNhbGFyeSI6NTAwMDAsImZ1bGxuYW1lIjoibW91bGkgc2hhbmthciIsImlhdCI6MTczMzgyNDU3N30.SGeezmerUp23BT5BUSWVyzrSUluInw8jVckTv6EAuvw",
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
      setUserinfo(data);
      setStatus(apiStatus.success);
    } catch (error) {
      setStatus(apiStatus.failure);

      if (error.name === "AbortError") {
        toast.error("Something Wrong");
      } else {
        toast.error(error.message);
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
      <Header status={user} />
      <RemaingSalaryPercentage status={user} />
      <RecentSpends />
      <SpendGroups data={user} />
      <FooterNav />
    </div>
  );
};

export default Home;
