// inherits change pitch method from wavemenu (no need state)

import React from 'react';

const Slider = ({value, handleChange}) => {
  return (
    <div className="slide-container">
      <input
        type="range"
        min="220"
        max="800"
        value={value}
        onChange={handleChange}
        id="frequency" />
    </div>
  )
}

export default Slider;
