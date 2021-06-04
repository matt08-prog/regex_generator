import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
  <React.StrictMode>
    <App bind={this}/>
  </React.StrictMode>,
  document.getElementById("root")
);