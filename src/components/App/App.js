import React, { useState, Suspense } from 'react';
import './App.scss';
import { Webworkers } from '../webworkers/Webworkers';
import { FormComponent } from '../MaterialUI/FormComponent';
import { SetInterval } from '../SetInterval/SetInterval';
import { RxjsComponent } from '../Rxjs/RxjsComponent';

const TestComponent = React.lazy(() => import('../Test/TestComponent'));

export const App = () => {
  const [component, setComponent] = useState("empty");
  const [count, setCount] = useState(5);

  return (
    <div className="App">
      <RxjsComponent />
      <hr />
      <button
        onClick={() =>
          setComponent(prevComponent =>
            prevComponent === "test" ? "empty" : "test"
          )
        }
      >
        change component
      </button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+++</button>
      <Suspense fallback={<div>Loading...</div>}>
        {component === "test" && <TestComponent prop={"test"} count={count} />}
      </Suspense>
      <hr />
      <div>
        <Webworkers />
      </div>
      <FormComponent />
      <hr/>
      <SetInterval />
    </div>
  );
};
