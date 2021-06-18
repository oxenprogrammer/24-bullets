import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Software Developer: Emanuel Okello', { fontSize: '26px', fill: '#fff' });
    this.soundText = this.add.text(0, 0, 'Sound Track: Hitman by Kevin MacLeod', { fontSize: '26px', fill: '#fff' });
    this.gameAssetsText = this.add.text(0, 0, 'Game Assets: FOSS', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 4, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.gameAssetsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.soundText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.gameAssetsText.setY(1000);
    this.soundText.setY(1000);
    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.destroy;
      },
    });

    this.gameAssetTween = this.tweens.add({
      targets: this.gameAssetsText,
      y: -300,
      ease: 'Power1',
      duration: 9000,
      delay: 2000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.destroy;
      },
    });

    this.soundTween = this.tweens.add({
      targets: this.soundText,
      y: -400,
      ease: 'Power1',
      duration: 27000,
      delay: 3000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -50,
      ease: 'Power1',
      duration: 29000,
      delay: 4000,
      onComplete: () => {
        // eslint-disable-next-line no-unused-expressions
        this.madeByTween.destroy;
        this.scene.start('Title');
      },
    });
  }
}