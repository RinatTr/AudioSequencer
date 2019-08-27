// inherits change pitch method from wavemenu (no need state)

import React from 'react';

const Slider = ({value, min, max, handleChange, step = "1"}) => {
  return (
    <div className="slide-container">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        id="frequency"
        step={step} />
    </div>
  )
}

export default Slider;
