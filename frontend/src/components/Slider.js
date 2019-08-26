// inherits change pitch method from wavemenu (no need state)

import React from 'react';

const Slider = ({value, handleChange}) => {
  return (
    <div className="slide-container">
      <input
        type="range"
        min="1"
        max="600"
        value={value}
        onChange={handleChange}
        id="frequency" />
    </div>
  )
}

export default Slider;
