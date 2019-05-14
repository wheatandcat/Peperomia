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
          <a
            href="https://peperomia.app/"
            rel="noreferrer"
            target="_blank"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            ペペロミア
          </a>
        </div>
      </div>
    </div>
  );
};
