import "./App.css";

import { Routes, Route, Navigate } from "react-router";

import Home from "./Components/Home";
import Calendar from "./Components/Calandar";
import AddSpend from "./Components/AddNewSpend";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calandar" element={<Calendar />} />
        <Route path="/addspend" element={<AddSpend />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
