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
  const { spendid, spendtype, spendname, amount, datetime } = props.item;
  // const date = datetime.split(" ")[0].split("-");
  const time = datetime.split(" ")[1].slice(0, 5);
  return (
    <li key={spendid} className="spend-item-main-container">
      <div>
        <div className="spend-type-color">
          {spendTypeLogo[spendtype]}
          <p>{spendtype}</p>
        </div>
        <h5>{spendname}</h5>
        <div className="spend-amount">
          <p>&#8377; {` ${amount}`}</p>
          {/* <p>(25%)</p> */}
        </div>
      </div>
      <div className="edit-button-container">
        <p>
          {/* <span>{`${date[2]}`}</span> */}
          {` ${time}`}
        </p>

        <button>Delete</button>
      </div>
    </li>
  );
};
export default SpendItem;
