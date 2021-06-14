import Phaser from 'phaser';
import myLogo from '../assets/logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', myLogo);
  }

  create() {
    this.scene.start('Preloader');
  }
}