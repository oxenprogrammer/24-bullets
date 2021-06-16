import Phaser from 'phaser';
import Button from '../Objects/Buttons';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.text = this.add.text(300, 300, 'GAME OVER');
    this.text.setColor('red');
    this.text.setFontSize(36);

    this.yourScore = this.add.text(300, 200, `Your Score: ${this.score}`);
    this.yourScore.setColor('red');
    this.yourScore.setFontSize(24);

    this.gameButton = new Button(this, 400, 400, 'blueButton1', 'blueButton2', 'Play Again', 'Game');
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
  }
}