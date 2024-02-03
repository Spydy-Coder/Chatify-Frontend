import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
// Import Bootstrap CSS (add this line in your main JavaScript or SCSS file)
import 'bootstrap/dist/css/bootstrap.min.css';

// If you need Bootstrap JavaScript features (like tooltips, modals, etc.), also add:
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
