import FooterNav from "../Footer";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const signout = () => {
    Cookies.remove("manager");
    navigate("/login");
    toast.success("Sign Out Successfully");
  };
  return (
    <>
      <Toaster />
      <button onClick={signout}>Sign Out</button>
      <FooterNav />
    </>
  );
};
export default Profile;
