// useEffect lets us express different kinds of side effects after a component
// renders.
import React, { useState, useEffect } from "react";
function UseEffectHook() {
const [count, setCount] = useState(0);
const [name, setName] = useState("");
useEffect(() => {
console.log("useEffect- updating document tittle");
document.title = `you have clicked ${count}`;
}, [count]);
return (
<div>
<h1>{count}</h1>
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<button onClick={() => setCount(count + 1)}>inc Count</button>
</div>
);
}
export default UseEffectHook