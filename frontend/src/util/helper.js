export const noteToFreq = (note) => {
  let notes = { "A": 0,
                "A#": 1,
                "B": 2,
                "C": 3,
                "C#": 4,
                "D": 5,
                "D#": 6,
                "E": 7,
                "F": 8,
                "F#": 9,
                "G": 10,
                "G#": 11 }
  let octave;
  let keyNumber;

  octave = (note.length === 3) ? note[2] : note[1];

  keyNumber = notes[note.slice(0, -1)]

  if (keyNumber < 3) {
      keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
  } else {
      keyNumber = keyNumber + ((octave - 1) * 12) + 1;
  }

  // Return frequency of note
  return (440 * Math.pow(2, (keyNumber - 49) / 12)).toFixed(3);
}

export const isInRange = (freqState, mid) => {
  if (!freqState) return false;
  return (freqState > mid - 10 && freqState < mid + 10)
}
