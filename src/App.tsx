import React, { useState } from "react";
import "./App.css";
import Column from "./components/Column";

function App() {
  const [boxes, setBoxes] = useState(8);
  const [effectOn, setEffectOn] = useState(false);
  const arr = Array.from(Array(Math.max(0, boxes)));

  return (
    <div className="App" style={{ display: "flex" }}>
      {/* Top boxes showcasing column-wrap behavior */}
      <div className="row">
        <Column
          className="column sample"
          style={{ borderColor: "white", zIndex: 10 }}
          wrap={effectOn}
        >
          {arr.map((_, index) => (
            <div
              className="big-box grey"
              key={`big-box-grey-${index}`}
              style={{ padding: index }}
            />
          ))}
        </Column>
        <div
          className="column sample"
          style={{ borderColor: "blue", zIndex: 1 }}
        >
          {arr.map((_, index) => (
            <div
              className="big-box purple"
              key={`big-box-purple-${index}`}
              style={{ padding: index }}
            />
          ))}
        </div>
      </div>

      <div className="column legend">
        <p>{effectOn ? "Behavior: modified" : "Behavior: default"}</p>
        <p>{`Grey boxes: ${boxes}`}</p>
        <p>{`Purple boxes: ${boxes}`}</p>
        <div className="legend-buttons">
          <button onClick={() => setBoxes(boxes - 1)} disabled={boxes === 0}>
            -
          </button>
          <button onClick={() => setBoxes(boxes + 1)}>+</button>
          <button className="big-button" onClick={() => setEffectOn(!effectOn)}>
            Toggle effect
          </button>
          <p>Note: the blue box is composed of simple div's with css styles.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
