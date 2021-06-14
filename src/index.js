import './styles/main.scss';

import Phaser from 'phaser';
import Model from './Model';
import config from './Config/config';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

const game = new Game();

const { body } = document;
body.appendChild(game);