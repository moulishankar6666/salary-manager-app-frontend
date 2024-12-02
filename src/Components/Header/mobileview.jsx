import "./index.css";

import logo from "../assets/app logo.png";

import { FaMoon } from "react-icons/fa6";

const UserProfile = () => {
  return (
    <div className="header-user-profile-container">
      <div className="user-profile-main-container">
        <div className="user-profile-container">
          <img className="user-profile" src={logo} alt="profile" />
        </div>
        <div>
          <h6>Hello!</h6>
          <h5>Mouli Shankar</h5>
        </div>
      </div>
      <button className="mode-button">{<FaMoon />}</button>
    </div>
  );
};

export default UserProfile;
