import React from "react";

export default () => {
  return (
    <div style={{ height: "100vh" }}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "10rem"
          }}
        >
          <div>この予定は現在非公開です</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40px",
          backgroundColor: "#232F3E"
        }}
      >
        <div
          style={{
            color: "#fff",
            position: "absolute",
            bottom: 5,
            right: 10
          }}
        >
          ペペロミア
        </div>
      </div>
    </div>
  );
};
