import Phaser from 'phaser';
import Button from '../Objects/Buttons';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

    this.soundButton.setInteractive();

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
      this.sys.game.globals.bgSound.stop();
      this.model.bgSoundPlaying = false;
    } else {
      this.soundButton.setTexture('checkedBox');
      if (this.model.bgSoundPlaying === false) {
        this.sys.game.globals.bgSound.play();
        this.model.bgSoundPlaying = true;
      }
    }
  }
}