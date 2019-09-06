export const initOsc = (context, type, frequency) => {
  let osc = context.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  return osc;
}
export const initGain = (context, osc) => {
    let gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);
    return gain;
}
