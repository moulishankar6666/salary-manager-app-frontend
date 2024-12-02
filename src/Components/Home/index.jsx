import "./index.css";

import Header from "../Header";
import RemaingSalaryPercentage from "./salayPercentage";
import SpendGroups from "./spendGroups";

const Home = () => {
  return (
    <div className="home-main-container">
      <Header />
      <RemaingSalaryPercentage />
      <SpendGroups />
    </div>
  );
};

export default Home;
