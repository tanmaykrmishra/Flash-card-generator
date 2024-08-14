import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles
import App from "./App"; // Main App component
import { BrowserRouter as Router } from "react-router-dom";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
