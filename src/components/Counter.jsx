import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);

  return (
    <button onClick={increment} type="button">
      Count is {count}
    </button>
  );
};

export default Counter;

