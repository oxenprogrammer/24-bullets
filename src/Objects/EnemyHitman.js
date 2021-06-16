import Phaser from 'phaser';
import Entity from './Entity';

export default class EnemyHitman extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy0', 'EnemyHitman');
    this.body.velocity.y = Phaser.Math.Between(30, 80);
  }
}