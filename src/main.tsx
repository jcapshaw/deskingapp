import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Import your CSS file for styling
import App from "./App"; // Import the App component
import LoginForm from "./components/LoginForm"; // Import the LoginForm component

const root = document.getElementById("root");
const appRoot = createRoot(root!);

appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
