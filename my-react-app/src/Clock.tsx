import {useEffect, useState} from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => clearTimeout(id);
  }, [time]);

  return <p>{time.toLocaleTimeString()}</p>;
}

export default Clock;