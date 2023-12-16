import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { inject } from '@vercel/analytics';

import "./index.css";

inject();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
