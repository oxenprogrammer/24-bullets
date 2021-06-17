import './styles/main.scss';

import Phaser from 'phaser';
import BootScene from './Scenes/BootScene';
import CreditsScene from './Scenes/CreditsScene';
import GameOverScene from './Scenes/GameOverScene';
import GameScene from './Scenes/GameScene';
import Model from './Model';
import OptionsScene from './Scenes/OptionsScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import config from './Config/config';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgSound: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();