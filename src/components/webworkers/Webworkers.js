import WebWorker from '../../webWorkers/WebWorker';
import myworker from '../../webWorkers/testWorker';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const testWebWorker = (worker, setWorkerData) => () => {
  setWorkerData('wating response');
  worker.postMessage({ cmd: 'test', data: 'give me all your money' });
};

export const Webworkers = () => {
  // useRef хорош
  const worker = useRef(new WebWorker(myworker));
  const [workerData, setWorkerData] = useState('');
  
  useEffect(
    () => {
      // выполнение при старте
      worker.current.postMessage({ cmd: 'onload' });
  
      // принятие всех ответов от воркера
      worker.current.addEventListener('message', (event) => {
        console.log(event.data);
        setWorkerData(event.data);
      });
    },
    true
  );

  const testWebWorkerError = useCallback(() => {
    worker.current.postMessage({ cmd: 'error' });
  });
  
  return (
    <>
      <button onClick={testWebWorker(worker.current, setWorkerData)}>web worker</button>{/** обращение через внешнюю функцию */}
      <button onClick={testWebWorkerError}>web worker error</button>{/** обращение через хук */}
      <button onClick={() => worker.current.postMessage({ cmd: 'lul' })}>{/** обращение через анонимную функцию */}
        unknown command
      </button>
      <p>
        {JSON.stringify(workerData)}
      </p>
    </>
  );
};
