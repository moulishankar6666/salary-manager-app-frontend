import "./App.css";

import { Routes, Route, Navigate } from "react-router";

import Home from "./Components/Home";
import Calendar from "./Components/Calandar";
import AddSpend from "./Components/AddNewSpend";
import MonthWiseSpends from "./Components/MonthWiseSpends";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import ProctedRoute from "./Components/ProctedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route
          path="/home"
          element={
            <ProctedRoute>
              <Home />
            </ProctedRoute>
          }
        />
        <Route
          path="/calandar"
          element={
            <ProctedRoute>
              <Calendar />
            </ProctedRoute>
          }
        />
        <Route
          path="/addspend"
          element={
            <ProctedRoute>
              <AddSpend />
            </ProctedRoute>
          }
        />
        <Route
          path="/monthlyspends"
          element={
            <ProctedRoute>
              <MonthWiseSpends />
            </ProctedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProctedRoute>
              <Profile />
            </ProctedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
