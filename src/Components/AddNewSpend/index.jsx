import "./index.css";

import windowPoster from "../assets/destop poster.png";

import FooterNav from "../Footer";
const AddSpend = () => {
  return (
    <div className="add-new-spend-main-container">
      <form>
        <h1>ADD NEW SPEND</h1>
        <div>
          <label>NAME OF SPEND</label>
          <input
            placeholder="Enter name of spend"
            className="input"
            type="text"
          />
        </div>
        <div>
          <label>TYPE OF SPEND</label>
          <select className="input">
            <option value="House Expences">House Expences</option>
            <option value="Savings">Savings</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div>
          <label>WHEN YOU SPEND ?</label>
          <input className="input" type="time" />
        </div>
        <div>
          <label>HOW MUCH YOU SPEND ?</label>
          <input placeholder="Enter amount" className="input" type="text" />
        </div>
        <button type="submit">ADD</button>
      </form>
      <img src={windowPoster} alt="window-poster" />
      <FooterNav />
    </div>
  );
};
export default AddSpend;
