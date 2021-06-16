import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.text = this.add.text(300, 300, 'GAME OVER');
    this.text.setColor('red');
    this.text.setFontSize(36);
  }
}