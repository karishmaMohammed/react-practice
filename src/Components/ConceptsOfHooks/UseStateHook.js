// use state hook  return an array with two elements
// 1- Current State
// 2- State Setter function
import React, { useState } from "react";

function UseStateHook() {

const initialCount = 0;
const [count, setCount] = useState(initialCount);
const incrementByFive = () => {
for (let i = 0; i < 5; i++) {
setCount((prevCount) => prevCount + 1);
}
};

return (
<div>
<h1>{count}</h1>
<button onClick={() => setCount(initialCount)}>Reset Count</button>
<button onClick={() => setCount(count + 1)}> increment count</button>
<button onClick={() => setCount(count - 1)}> Decrement count</button>
<button onClick={incrementByFive}>Increment by Five</button>
</div>
);
}
export default UseStateHook;