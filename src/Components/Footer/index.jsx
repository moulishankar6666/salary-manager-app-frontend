import "./index.css";

import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

import { Link } from "react-router";

const FooterNav = () => {
  return (
    <div className="footer-nav-main-container">
      <ul className="footer-nav-links-container">
        <li>
          <button>
            <Link to="/home ">
              <FaHome size={22} />
            </Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/calandar">
              <FaCalendarAlt />
            </Link>
          </button>
        </li>
        <li>
          <button>
            <FaCirclePlus />
          </button>
        </li>
        <li>
          <button>
            <FaClipboardList />
          </button>
        </li>
        <li>
          <button>
            <IoPersonCircle size={25} />
          </button>
        </li>
      </ul>
    </div>
  );
};
export default FooterNav;
