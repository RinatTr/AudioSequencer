# AudioSequencer
Simple audio sequencer built with React and Web Audio API (work in progress).

## Instructions
Clone this repo, and inside the repo folder run:
1. `$ npm i`
2. `$ npm start`

## TODO
[] cb function for controller
[] on-off light
[] break down WaveMenu component
[] refactor visualization

//Update: there is no way to tell in chrome if an audionode is connected. hence need to change the clipper function to update the gain instead of connecting and disconnecting the node continuously.

//NOTE: frequencies are a bit rounded to increase the chance of hitting a note in an attempt to compensate on the inaccuracy of the HTML slider.
