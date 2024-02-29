import React from "react";

export default function Child({ age, setAge, children }) {
  return (
    <div>
      Child
      <h2>{age}</h2>
      <h3>{children}</h3>
    </div>
  );
}
