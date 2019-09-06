import React from 'react';

const key_display = (note, id, freq) => {
  return (
    <div key={id} className="key-wrapper" id={freq}>
    </div>
  )
}

export default key_display;
