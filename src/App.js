import "./App.css";

import Home from "./Components/Home";
import { Routes, Route, Navigate } from "react-router";
import Calandar from "./Components/Calandar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calandar" element={<Calandar />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
