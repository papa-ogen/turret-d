import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'turret-d',
  width: 640,
  height: 700,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
}
