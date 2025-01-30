// useRef
//  The useRef Hook allows you to persist values between renders.
//  It can be used to store a mutable value that does not cause a re-render when
//  updated.
//  It can be used to access a DOM element directly.
//  The useRef Hook can also be used to keep track of previous state values.
 import { useRef } from "react";

 
 function UseRefHook() {
 const inputElement = useRef();
 const focusInput = () => {
 inputElement.current.focus();
 };
//  Use useRef to focus the input:
 return (
 <>
 <input type="text" ref={inputElement} />
 <button onClick={focusInput}>Focus Input</button>
 </>
 );
 }
 export default UseRefHook;