import "./index.css";

import Header from "../Header";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";
import RecentSpends from "./recentSpends";
import FooterNav from "../Footer";

const Home = () => {
  return (
    <div className="home-main-container">
      <Header />
      <RemaingSalaryPercentage />
      <RecentSpends />
      <SpendGroups />
      <FooterNav />
    </div>
  );
};

export default Home;
