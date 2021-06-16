import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.anims.create({
      key: 'enemy0',
      frames: this.anims.generateFrameNumbers('enemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy2',
      frames: this.anims.generateFrameNumbers('enemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.player = this.physics.add.sprite(400, 300, 'soldier').setScale(0.3);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    this.enemy0 = this.physics.add.group({
      key: 'enemy0',
      repeat: 4,
      setXY: { x: 24, y: 0, stepX: 70 },
    });

    this.enemy0.children.iterate((child) => {
      // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.body.setGravityX(2);
      child.body.setGravityY(10);
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };
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