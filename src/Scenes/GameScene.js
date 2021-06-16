import Phaser from 'phaser';
import EnemyHitman from '../Objects/EnemyHitman';
import Player from '../Objects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.score = 0;
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.scoreLabel = this.add.text(100, 24, '');
    this.scoreLabel.setColor('red');
    this.scoreLabel.setFontSize(24);

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

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.keyShoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'soldier',
    );

    this.player.setScale(0.3);

    this.sfx = {
      explosions: [
        this.sound.add('death'),
      ],
      laser: this.sound.add('enemyShot'),
      shellFall: this.sound.add('shellFall'),
    };

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyHitman(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerLaser.destroy();
        this.incrementScore();
      }
    });

    this.count = 0;
    this.enemyShot = this.sound.add('enemyShot', { volume: 1, loop: true });
    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
          && !laser.getData('isDead')) {
        this.count += 1;
        laser.destroy();
        if (this.count >= 4) {
          this.enemyShot.play();
          player.explode(false);
          // this.scene.start('GameOverScene');
          player.onDestroy(this.score);
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        player.explode(false);
        enemy.explode(true);
        // this.scene.start('GameOverScene');
        player.onDestroy(this.score);
      }
    });

    this.physics.add.overlap(this.playerLasers, this.enemyLasers, (playerLaser, enemyLaser) => {
      playerLaser.destroy();
      enemyLaser.destroy();
    });
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }
      if (this.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (this.cursors.right.isDown) {
        this.player.moveRight();
      }

      if (this.keyShoot.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  incrementScore() {
    this.score += 1;
    this.scoreLabel.text = `Enemies Killed: ${this.score.toString()}`;
  }
}