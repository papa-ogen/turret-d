import Phaser from 'phaser'
import config from './config'
import GameScene from './scenes/Game'
import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
// import TitleScene from './scenes/TitleScene';
// import UIScene from './scenes/UIScene';

class Game extends Phaser.Game {
  constructor () {
    super(config)
    this.scene.add('Game', GameScene)
    this.scene.add('Boot', BootScene)
    this.scene.add('Splash', SplashScene)
    // this.scene.add('Title', TitleScene);
    // this.scene.add('UI', UIScene);
    this.scene.start('Boot')
  }
}

window.onload = function () {
  window.game = new Game()
}
