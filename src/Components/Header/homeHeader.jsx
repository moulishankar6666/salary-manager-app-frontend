import "./index.css";

import logo from "../assets/app logo.png";

import { IoNotifications } from "react-icons/io5";

import Skeleton from "../Loader/skeletonLoading";

import React from "react";

const Header = (props) => {
  const { status, user } = props.status;
  return (
    <div className="header-user-profile-container">
      <div className="user-profile-main-container">
        <div className="user-profile-container">
          <img className="user-profile" src={logo} alt="profile" />
        </div>
        <div>
          <h6>Hello!</h6>
          <h5>
            {status === "SUCCESS" ? user.userInfo.fullname : <Skeleton />}
          </h5>
        </div>
      </div>
      <button type="button" aria-label="Aria button" className="mode-button">
        {<IoNotifications />}
      </button>
    </div>
  );
};

export default React.memo(Header);
