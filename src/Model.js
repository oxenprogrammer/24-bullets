/* eslint-disable no-underscore-dangle */
export default class Model {
  constructor() {
    this._soundOn = true;
    this._bgSoundPlaying = false;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgSoundPlaying(value) {
    this._bgSoundPlaying = value;
  }

  get bgSoundPlaying() {
    return this._bgSoundPlaying;
  }
}