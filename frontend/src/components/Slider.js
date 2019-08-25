// inherits change pitch method from wavemenu (no need state)

import React from 'react';

const Slider = ({freq, handleFrequency}) => {
  return (
    <div className="slide-container">
      <input
        type="range"
        min="220"
        max="800"
        value={freq}
        onChange={handleFrequency}
        id="frequency" />
    </div>
  )
}

export default Slider;
