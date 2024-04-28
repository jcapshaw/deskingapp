import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import InputField from "./components/InputField";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap your application in the Router component */}
      <div className="grid.container">
        <h1 className="grid-item">Desking Application</h1>
        <Routes>
          <Route path="/" element={<HomePage className="grid-item" />} />
          <Route path="/input" element={<InputField className="grid-item" />} />
          <Route path="/login" element={<LoginForm className="grid-item" />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
