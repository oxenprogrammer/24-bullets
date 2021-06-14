import Phaser from 'phaser';
import hitman from '../assets/hitman.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('hitman', hitman);
  }

  create() {
    const image = this.add.image(400, 300, 'hitman');
    image.setScale(0.3);
  }
}