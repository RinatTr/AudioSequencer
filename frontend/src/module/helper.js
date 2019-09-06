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

export const valueToFraction = (value) => {
  // use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  return (parseInt(value) / 100) ** 2;

}
