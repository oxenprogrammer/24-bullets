import Phaser from 'phaser';
import EnemyLaser from './EnemyLaser';
import Entity from './Entity';

export default class EnemyHitman extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy0', 'EnemyHitman');
    this.body.velocity.y = Phaser.Math.Between(30, 80);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y * 1.1,
        );
        laser.setScale(0.5);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}
