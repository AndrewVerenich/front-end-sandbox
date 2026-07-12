import {useState} from "react";

function Counter() {
  const [counter, setCounter] = useState(0);
  function increment() {
    setCounter(counter + 1);
  }

  function decrement() {
    setCounter(counter - 1);
  }
  function reset() {
    setCounter(0);
  }
  return (
      <>
        <br/>
        <button onClick={increment}>+1</button>
        <button disabled={counter === 0} onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
        <p>Counter: {counter}</p>
        <p style={{ color: 'red' }}>{counter > 10 ? 'Много' : ''}</p>
      </>
  )
}
export default Counter;