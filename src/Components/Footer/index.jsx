import "./index.css";

import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

import { Link } from "react-router";

const FooterNav = () => {
  const path = window.location.pathname;

  return (
    <footer className="footer-nav-main-container">
      <ul className="footer-nav-links-container">
        <li>
          <button
            aria-label="Aria navlinks"
            className={path === "/home" ? "active" : "inactive"}
          >
            <Link aria-label="used to navigate" className="link" to="/home ">
              <FaHome size={22} />
            </Link>
          </button>
        </li>
        <li>
          <button
            aria-label="Aria navlinks"
            className={path === "/calandar" ? "active" : "inactive"}
          >
            <Link aria-label="used to navigate" className="link" to="/calandar">
              <FaCalendarAlt />
            </Link>
          </button>
        </li>
        <li>
          <button
            aria-label="Aria navlinks"
            className={path === "/addSpend" ? "active" : "inactive"}
          >
            <Link aria-label="used to navigate" className="link" to="/addSpend">
              <FaCirclePlus />
            </Link>
          </button>
        </li>
        <li>
          <button
            aria-label="Aria navlinks"
            className={path === "/monthlyspends" ? "active" : "inactive"}
          >
            <Link
              aria-label="used to navigate"
              className="link"
              to="/monthlyspends"
            >
              <FaClipboardList />
            </Link>
          </button>
        </li>
        <li>
          <button
            aria-label="Aria navlinks"
            className={path === "/profile" ? "active" : "inactive"}
          >
            <Link aria-label="used to navigate" className="link" to="/home">
              <IoPersonCircle size={25} />
            </Link>
          </button>
        </li>
      </ul>
    </footer>
  );
};
export default FooterNav;
