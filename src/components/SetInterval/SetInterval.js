import React, { useEffect, useRef, useState } from "react";

/**
 * использование хука useInterval вместо setInterval в хуках ( есть причины )
 */
export const SetInterval = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);
  
  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? delay : null);
  
  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }
  
  function stopInterval() {
    setIsRunning(!isRunning);
  }
  
  return (
    <>
      <h1>{count}</h1>
      <input value={delay} onChange={handleDelayChange} />
      <button onClick={stopInterval}>
        {isRunning ? 'stop' : 'resume'}
      </button>
    </>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

