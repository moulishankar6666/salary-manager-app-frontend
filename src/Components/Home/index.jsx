import "./index.css";

import Header from "../Header";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

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
  const options = {
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb3VsaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCcEd3VUpnOVp3N3o5Q2J1ckozVGl1Y3lpN2F6NkxYMlhjdlFIMUFvRUxHcXBtYVpxemkuNiIsInNhbGFyeSI6NTAwMDAsImZ1bGxuYW1lIjoibW91bGkgc2hhbmthciIsImlhdCI6MTczMzgyNDU3N30.SGeezmerUp23BT5BUSWVyzrSUluInw8jVckTv6EAuvw",
    },
  };
  useEffect(() => {
    async function getData() {
      setStatus(apiStatus.loading);
      const fetchdata = await fetch(
        "https://salary-manger-backend.onrender.com/profile",
        options
      );
      const data = await fetchdata.json();
      setUserinfo(data);
      setStatus(apiStatus.success);
    }
    getData();
  }, []);
  console.log(userinfo);

  return (
    <div className="home-main-container">
      <Header />
      <RemaingSalaryPercentage status={{ status }} />
      <RecentSpends />
      <SpendGroups status={{ status }} />
      <FooterNav />
    </div>
  );
};

export default Home;
