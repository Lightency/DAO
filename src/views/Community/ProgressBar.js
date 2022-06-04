import React from "react";
// import './progressBar.module.css'

export default function ProgressBar(prop) {
  const total = prop.yes + prop.no;
  const yesPer = (prop.yes / total) * 100;
  const noPer = (prop.no / total) * 100;
  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {total ? <p style={{ marginRight: 5 }}>Yes</p> : null}
        <div
          style={{
            backgroundColor: "#0c1424",
            height: 20,
            width: yesPer,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        ></div>
        <div
          style={{
            backgroundColor: "#988f2a",
            height: 20,
            width: noPer,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
        ></div>
        {total ? <p style={{ marginLeft: 5 }}>No</p> : null}
      </div>
      {total ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p>{prop.yes} - </p>
          <p> {prop.no}</p>
        </div>
      ) : null}
    </div>
  );
}
