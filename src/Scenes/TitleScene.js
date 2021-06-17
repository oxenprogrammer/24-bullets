import Phaser from 'phaser';
import Button from '../Objects/Buttons';
import config from '../Config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // background
    this.add.image(600, 324, 'hitman2').setScale(0.6);

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // LeaderBoard
    this.LeaderBoardButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Scores', 'LeaderBoardScene');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 180, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;

    if (this.model.soundOn === true && this.model.bgSoundPlaying === false) {
      this.bgSound = this.sound.add('bgSound', { volume: 0.5, loop: true });
      this.bgSound.play();
      this.model.bgSoundPlaying = true;
      this.sys.game.globals.bgSound = this.bgSound;
    }
  }
}