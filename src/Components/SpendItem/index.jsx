import { MdSavings } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

import "./index.css";

const spendTypeLogo = {
  Luxury: <IoFastFood size={15} />,
  "House Expences": <FaHome size={15} />,
  Savings: <MdSavings size={15} />,
};

const SpendItem = (props) => {
  const { spendtype, spendname, amount, datetime } = props.item;
  const date = datetime.split(" ")[0].split("-");
  const time = datetime.split(" ")[1].slice(0, 5);
  const pathname = window.location.pathname.slice(1);
  return (
    <li className="spend-item-main-container">
      <div>
        <div className="spend-type-color">
          {spendTypeLogo[spendtype]}
          <p>{spendtype}</p>
        </div>
        <h5>{spendname.toUpperCase()}</h5>

        <div className="spend-amount">
          <p>&#8377; {` ${amount}`}</p>
          {/* <p>(25%)</p> */}
        </div>
      </div>
      <div className="edit-button-container">
        <p>{` ${time}`}</p>

        {pathname === "monthlyspends" ? (
          <p>{`Date :${date[2]}`}</p>
        ) : (
          <button>Delete</button>
        )}
      </div>
    </li>
  );
};
export default SpendItem;
