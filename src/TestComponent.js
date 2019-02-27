import React, { useState, useRef, useEffect, useMemo } from 'react';

export const TestComponent = props => {
  const [name, setName] = useState("name");
  // функция выполняется, а состояние живет в глубинах движка
  const [count, setCount] = useState(props.count ** 2);
  const [prevCount, setPrevCount] = useState(null);
  const textInputRef = useRef(null);
  
  useEffect(
    () => {
      console.log("componentDidMount");
      const timer = setTimeout(_incr, 1000);
      
      return () => {
        console.log("componentWillUnmount при удалении компонента");
        clearTimeout(timer);
      };
    },
    [1]
  );
  
  useEffect(() => {
    console.log("componentDidUpdate", props);
    
    if (props.count !== prevCount) {
      setPrevCount(props.count);
      setCount(props.count ** 2);
    }
  
    return () => {
      console.log("componentWillUnmount при перерендере компонента");
    };
  });
  
  const memoizedValue = useMemo(
    () => {
      console.log("вызывается при изменении count");
      return count << 5;
    },
    [count]
  );
  
  const _incr = () =>
    setCount(prevCount => {
      return count + 1;
    });
  
  const setFocusToInput = () => {
    textInputRef.current.focus();
  };
  
  return (
    <div>
      <p>name: {name}</p>
      <p>count: {count}</p>
      <p>memoizedValue: {memoizedValue}</p>
      <input
        type="text"
        name="name"
        defaultValue={name}
        onChange={e => setName(e.target.value)}
        ref={textInputRef}
      />
      <button onClick={setFocusToInput}>focus input</button>
      <button onClick={_incr}>increment count</button>
    </div>
  );
};

export default TestComponent;
