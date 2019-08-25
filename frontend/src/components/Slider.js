// inherits change pitch method from wavemenu (no need state)

import React from 'react';

const Slider = ({props}) => {
  return (
    <div class="slide-container">
      <input type="range" min="220" max="800" value="440" class="slider" id="frequency" />
    </div>
  )
}

export default Slider;
