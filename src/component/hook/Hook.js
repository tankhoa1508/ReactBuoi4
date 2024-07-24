import React, { useState, useEffect } from "react";

export default function Hook() {
  const [count, setCount] = useState(1);
  const [number, setNumber] = useState(1);
//   useEffect(() => {
//     console.log("side Effect");
//   }, []); //Chỉ render 1 lần khi f5

  useEffect(() => {
    console.log("side Effect");
  }, [count, number]); //render mỗi khi click button count hoặc number
  console.log("render Hook");

  //Cleanup useEffect (return ()=>{})
  //useEffect vẫn chỉ render 1 lần, nhưng vì có setInterval nên nó vẫn count
  //Tác dụng: Khi bị ẩn sẽ ngưng chạy (ko có thì ẩn vẫn chạy)
  useEffect(()=>{
    const timer = setInterval(()=> {
        setCount((preState)=> preState -1);
        console.log("a")
    },1000);
    return () => {
        clearInterval(timer);
    };
  },[])
  return (
    <div>
      <h1>Tìm hiểu useEffect</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>count up</button>
      <p>Number: {number}</p>
      <button onClick={() => setNumber(number + 1)}>number up</button>

      <h2>{count}</h2>
    </div>
  );
}
