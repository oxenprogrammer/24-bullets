import './styles/main.scss';

import Phaser from 'phaser';
import config from './Config/config';

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

const game = new Game();

const { body } = document;
body.appendChild(game);