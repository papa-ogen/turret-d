import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot' })
  }

  preload () {
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)

    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    this.load.image('logo', 'assets/images/ui/logo.png')
  }

  update () {
    if (this.fontsReady) {
      this.scene.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
