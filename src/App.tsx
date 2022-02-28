import React, { useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState(7);
  const [effectOn, setEffectOn] = useState(false);
  const arr = Array.from(Array(Math.max(0, boxes)));
  return (
    <div className="App">
      {/* Top boxes showcasing column-wrap behavior */}
      <div className="row">
        {/* First column of (grey) boxes */}
        <div className="column" style={{ zIndex: 10 }}>
          {arr.map((_, index) => (
            <div className="big-box grey" key={`big-box-grey-${index}`} />
          ))}
        </div>
        {/* Second column of (purple) boxes */}
        <div className="column" style={{ zIndex: 1 }}>
          {arr.map((_, index) => (
            <div className="big-box purple" key={`big-box-purple-${index}`} />
          ))}
        </div>
      </div>

      {/* Bottom boxes showcasing default row-wrap(reverse) behavior */}
      <div className="column">
        {/* First row of (grey) boxes */}
        <div className="row" style={{ zIndex: 10 }}>
          {arr.map((_, index) => (
            <div className="small-box grey" key={`small-box-grey-${index}`} />
          ))}
        </div>
        {/* Second row of (purple) boxes */}
        <div className="row" style={{ zIndex: 1 }}>
          {arr.map((_, index) => (
            <div
              className="small-box purple"
              key={`small-box-purple-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="column legend">
        <p>{effectOn ? "Behavior: modified" : "Behavior: default"}</p>
        <p>{`Grey boxes: ${boxes}`}</p>
        <p>{`Purple boxes: ${boxes}`}</p>
        <div className="row">
          <button onClick={() => setBoxes(boxes - 1)} disabled={boxes === 0}>
            -
          </button>
          <button onClick={() => setBoxes(boxes + 1)}>+</button>
          <button className="big-button" onClick={() => setEffectOn(!effectOn)}>
            Toggle effect
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
