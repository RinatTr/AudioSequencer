import React from 'react';
import { isInRange, noteToFreq } from '../util/helper.js';

const key_display = ({note, id, freqState}) => {
  let noteFreq = noteToFreq(note);
  let toggleColor = {
    border: '1px solid darkgrey',
    height: '100px',
    width: '30px',
    backgroundColor: isInRange(freqState, noteFreq) ? 'lightgreen' : 'white'
  }
  return (
    <div key={id} className="key-wrapper" style={toggleColor}>
      {note}
    </div>
  )
}

export default key_display;
