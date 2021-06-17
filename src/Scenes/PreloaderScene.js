import Phaser from 'phaser';
import blueButton02 from '../assets/ui/blue_button02.png';
import blueButton03 from '../assets/ui/blue_button03.png';
import box from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import death from '../assets/Enemies/pain.wav';
import deathMusic from '../assets/hitmam.mp3';
import enemy0 from '../assets/Enemies/hitman1_machine.png';
import enemyShot from '../assets/Enemies/enemy_shot.wav';
import explosion from '../assets/Enemies/sprExplosion.png';
import hitman2 from '../assets/hitman2.jpg';
import laserEnemy from '../assets/Enemies/enemy_bullet.png';
import laserPlayer from '../assets/Enemies/spaceMissiles_037.png';
import shellFall from '../assets/Enemies/Shells_falls-Marcel-829263474.wav';
import sndExplode0 from '../assets/sndExplode0.wav';
import sndExplode1 from '../assets/sndExplode1.wav';
import sndLaser from '../assets/sndLaser.wav';
import soldier from '../assets/shooter/survivor-shoot_shotgun_0.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', blueButton02);
    this.load.image('blueButton2', blueButton03);
    this.load.image('hitman2', hitman2);
    this.load.image('box', box);
    this.load.image('checkedBox', checkBox);
    this.load.audio('bgSound', [deathMusic]);
    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('enemyShot', enemyShot);
    this.load.audio('shellFall', shellFall);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('death', death);
    this.load.audio('sndLaser', sndLaser);
    this.load.spritesheet('soldier', soldier, { frameWidth: 512, frameHeight: 512 });

    this.load.spritesheet('explosion', explosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('enemy0', enemy0, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('laserEnemy0', laserEnemy);
    this.load.image('bullet', laserPlayer);
  }
}