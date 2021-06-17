// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import { getAllScores, postScore } from '../api/leaderboard.service';

import Button from '../Objects/Buttons';
import UserFormComponent from '../Form/UserForm.component';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    this.yourScore = this.add.text(300, 200, `Your Score: ${this.score}`);
    this.yourScore.setColor('red');
    this.yourScore.setFontSize(24);

    // User Form
    document.body.appendChild(UserFormComponent());

    // Save button

    this.saveButton = this.add.sprite(400, 340, 'blueButton1').setInteractive();
    this.saveText = this.add.text(200, 500, 'Save', {
      fontSize: '32px',
      fill: '#fff',
    });

    const that = this;
    this.form = document.querySelector('.form');
    this.saveButton.on('pointerdown', () => {
      const playerName = document.querySelector('[name = "name"]').value;
      if (this.form !== null) {
        this.form.remove();
      }
      postScore(playerName, that.score);
      getAllScores().then((result) => {
        that.scene.start('Title', result);
      });
    });

    this.saveButton.on(
      'pointerover',
      () => {
        this.saveButton.setTexture('blueButton2');
      },
    );

    this.saveButton.on(
      'pointerout',
      () => {
        this.saveButton.setTexture('blueButton1');
      },
    );

    Phaser.Display.Align.In.Center(this.saveText, this.saveButton);

    this.gameButton = new Button(this, 400, 420, 'blueButton1', 'blueButton2', 'Play Again', 'Game');
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
  }
}