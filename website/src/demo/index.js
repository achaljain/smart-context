import React from "react";
import { WithContextProvider } from "smart-context";

import userConfig from "./contextConfig/user";
import postConfig from "./contextConfig/posts";

import MyAwesomeComponent from "./components/functionComponent";
import ClassComp from "./components/classComponent";

import "./App.css";

function App() {
  return (
    <div className="demo-app-container">
      <ClassComp />
      <MyAwesomeComponent />
    </div>
  );
}

/** Add multiple contexts in App */
export default WithContextProvider(App, [userConfig, postConfig]);
