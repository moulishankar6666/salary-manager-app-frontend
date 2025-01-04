import FooterNav from "../Footer";

import profile from "../assets/app logo.png";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Loader from "../Loader";

import "./index.css";

const Profile = () => {
  const status = useSelector((state) => state.userinfo.value.status);
  const data = useSelector((state) => state.userinfo.value.data);
  const navigate = useNavigate();

  const signout = () => {
    Cookies.remove("manager");
    navigate("/login");
    toast.success("Sign Out Successfully");
  };

  const onSuccess = () => {
    const { userInfo } = data;
    const { fullname, username, salary } = userInfo;

    return (
      <div className="profile-user-info-container">
        <div>
          <img src={profile} alt="profile-pic" />
          <h1>{`${fullname.slice(0, 1).toUpperCase()}${fullname.slice(1)}`}</h1>
        </div>

        <p>
          <b>Username :</b> {username}
        </p>
        <p>
          <b>Month-salary :</b> {salary}
        </p>
      </div>
    );
  };

  return (
    <div className="profile-main-container">
      <Toaster />
      <h1 className="profile-title">Your Profile</h1>
      {status === "SUCCESS" ? onSuccess() : <Loader />}
      <button onClick={signout}>Sign Out</button>
      <FooterNav />
    </div>
  );
};
export default Profile;
