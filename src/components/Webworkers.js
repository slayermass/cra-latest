import WebWorker from '../webWorkers/WebWorker';
import myworker from '../webWorkers/test';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const testWebWorker = worker => () => {
  // подписаться на ответ
  worker.addEventListener('message', (event) => {
    console.log(event.data);
    return event.data;
  });
  // послать запрос
  worker.postMessage({ cmd: 'test', data: 'give me all your money' });
};

export const Webworkers = () => {
  // useRef хорош
  const worker = useRef(new WebWorker(myworker));
  const [workerData, setWorkerData] = useState('');
  
  useEffect(
    () => {
      // выполнение при старте
      worker.current.addEventListener('message', (event) => {
        setWorkerData(event.data);
      });
      
      worker.current.postMessage({ cmd: 'test', data: 'give me all your money' });
    },
    true
  );
  
  const testWebWorkerError = useCallback(() => {
    worker.current.addEventListener('message', (event) => {
      console.log(event.data);
    });
    // послать запрос
    worker.current.postMessage({ cmd: 'error' });
  });
  
  return (
    <>
      <button onClick={testWebWorker(worker.current)}>web worker</button>
      <button onClick={testWebWorkerError}>web worker error</button>
      <p>
        {JSON.stringify(workerData)}
      </p>
    </>
  );
};
