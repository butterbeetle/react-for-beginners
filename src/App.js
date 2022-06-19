import { useState, useEffect, useSyncExternalStore } from "react";

function Hello() {

  /* #type 1 */
  useEffect(() => {
    console.log("Hi");
    return () => console.log("Bye~");
  }, []);

  /* #type 2 */
  useEffect(function () {
    console.log("Hi");
    return function byeFn() {
      console.log("Bye~");
    }
  }, []);

  return <h1>Hello</h1>
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(prev => !prev);
  return (
    <div>
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;
