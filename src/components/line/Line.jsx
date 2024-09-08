import React, { useState, useEffect } from 'react';

const Line = () => {
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMinutes(new Date().getMinutes());
    }, 60000);

    return () => clearInterval(intervalId);
  });

  return <div className="line" style={{ top: minutes }}></div>;
};

export default Line;
