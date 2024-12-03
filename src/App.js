import "./App.css";

import Home from "./Components/Home";
import { Routes, Route, Navigate } from "react-router";
import Calendar from "./Components/Calandar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calandar" element={<Calendar />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
