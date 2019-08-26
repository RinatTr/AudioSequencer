// inherits change pitch method from wavemenu (no need state)

import React from 'react';

const Slider = ({value, min, max, handleChange}) => {
  return (
    <div className="slide-container">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        id="frequency" />
    </div>
  )
}

export default Slider;
