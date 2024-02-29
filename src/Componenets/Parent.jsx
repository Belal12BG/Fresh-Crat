import React, { useMemo, useState } from "react";

export default function Parent() {
  let [counter1, setCounter1] = useState(0);
  let [counter2, setCounter2] = useState(0);

  let checkCounter2 = useMemo(() => {
    console.log("fire");
    return counter2 % 2 === 0;
  }, [counter2]);

  return (
    <div>
      Parent
      <h1 onClick={() => setCounter1(counter1 + 1)}>counter1:{counter1}</h1>
      <h2 onClick={() => setCounter2(counter2 + 1)}>counter2:{counter2}</h2>
      <h3>{checkCounter2 ? "even" : "odd"}</h3>
    </div>
  );
}
