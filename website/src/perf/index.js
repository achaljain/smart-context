import React, { useState } from "react";
import SMART_CONTEXT_TODO from "./smart-context-todo";
import REDUX_TODO from "./redux-context-todo";
import VANILA_CONTEXT_TODO from "./vanilla-context-todo";

import "./App.css";

function App() {
  const [comp, setComp] = useState("1");
  const [perf, setPerf] = useState("1");
  const [sz, setSz] = useState(10);
  const [config, setConfig] = useState(null);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "demo") {
      setComp(value);
    } else if (name === "size") {
      setSz(parseInt(value));
    } else {
      setPerf(value);
    }
  };

  const simulateHandler = () => {
    document.getElementById("simulate-result").innerHTML = "Running simulation";
    setConfig({
      type: comp,
      inputSize: sz,
      perf: perf === "2",
    });
  };

  return (
    <div className="todo-app">
      <div className="app-options">
        <div className="option-input">
          <label htmlFor="app_type">App type</label>

          <select name="demo" id="app_type" onChange={inputChangeHandler}>
            <option value="1">Smart-Context</option>
            <option value="2">Vanilla React Context</option>
            <option value="3">Redux</option>
          </select>
        </div>

        <div className="option-input">
          <label htmlFor="optimized">Performance mode</label>

          <select name="perf" id="optimized" onChange={inputChangeHandler}>
            <option value="1">Default</option>
            <option value="2">High performance</option>
          </select>
        </div>

        <div className="option-input">
          <label htmlFor="size">Input size</label>

          <select name="size" id="size" onChange={inputChangeHandler}>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
            <option value="5000">5000</option>
            <option value="10000">10000</option>
          </select>
        </div>

        <button className="simulate" onClick={simulateHandler}>
          Run test
        </button>
      </div>

      <div className="result" id="simulate-result"></div>

      {config ? (
        <div className="todo-app-container">
          {config.type === "1" && <SMART_CONTEXT_TODO config={config} />}

          {config.type === "2" && <VANILA_CONTEXT_TODO config={config} />}

          {config.type === "3" && <REDUX_TODO config={config} />}
        </div>
      ) : null}
    </div>
  );
}

export default App;
