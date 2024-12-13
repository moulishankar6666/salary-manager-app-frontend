import { MdSavings } from "react-icons/md";

import "./index.css";

const SpendItem = (props) => {
  const { spendname } = props.item;
  return (
    <li className="spend-item-main-container">
      <div>
        <div className="spend-type-color">
          <MdSavings size={20} />
          <p>Savings</p>
        </div>
        <h5>{spendname}</h5>
        <div className="spend-amount">
          <p>5000/-</p>
          <p>(25%)</p>
        </div>
      </div>
      <div className="edit-button-container">
        <p>11:10 am</p>
        <button>Delete</button>
      </div>
    </li>
  );
};
export default SpendItem;
