import React from "react";

export default function Starfield() {
  const shooters = Array.from({ length: 7 }).map((_, i) => {
    const delay = (Math.random() * 8).toFixed(2) + "s";
    const dur = (2.8 + Math.random() * 2).toFixed(2) + "s";
    const top = (Math.random() * 40 - 10).toFixed(0) + "vh";
    const left = (Math.random() * 30 - 10).toFixed(0) + "vw";
    return (
      <span
        key={i}
        className="shooting-star"
        style={{ "--delay": delay, "--dur": dur, top, left }}
      />
    );
  });

  return (
    <>
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />
      <div className="stars4" />
      {shooters}
    </>
  );
}
