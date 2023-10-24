import React from "react";
import LeftRowA from "./leftRowA";
import MiddleB from "./middleB";
import MiddleC from "./middleC";
import MiddleD from "./middleD";
import MiddleE from "./middleE";
import LastF from "./lastF";
import LastG from "./lastG";

const gridTemplate = `
"a b b e f"
"a b b e f"
"a b b e f"
"a c c e f"
"a c c g g"
"a c c g g"
"a d d g g"
"a d d g g"
`;

function Dashboard() {
  return (
    <div className="mx-9 m-[2px] h-full  ">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gap: "12px",
          gridTemplateAreas: gridTemplate,
          gridTemplateColumns: "repeat(5, minmax(150px, 1fr))",
          gridTemplateRows: "repeat(8, minmax(60px, 1fr))",
        }}
      >
        <div className="h-full" style={{ gridArea: "a" }}>
          <LeftRowA />
        </div>
        <div className="h-full" style={{ gridArea: "b" }}>
          <MiddleB />
        </div>
        <div className="h-full" style={{ gridArea: "c" }}>
          <MiddleC />
        </div>
        <div className="h-full" style={{ gridArea: "d" }}>
          <MiddleD />
        </div>
        <div className="h-full" style={{ gridArea: "e" }}>
          <MiddleE />
        </div>
        <div className="h-full" style={{ gridArea: "f" }}>
          <LastF />
        </div>
        <div className="h-full" style={{ gridArea: "g" }}>
          <LastG />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
