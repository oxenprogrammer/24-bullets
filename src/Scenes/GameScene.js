import Phaser from 'phaser';
import soldier from '../assets/shooter/survivor-shoot_shotgun_0.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load sprite
    this.load.spritesheet('soldier', soldier, { frameWidth: 512, frameHeight: 512 });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.player = this.physics.add.sprite(400, 300, 'soldier').setScale(0.3);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
  }
}