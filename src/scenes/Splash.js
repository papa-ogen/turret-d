import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'Splash' })
  }

  preload () {
    this.createPreloader()
    this.loadAssets()
  }

  createPreloader () {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // add logo image
    const logo = this.add.image(width / 2, height / 2 - 110, 'logo')
    logo.setScale(0.1)

    // display progress bar
    var progressBar = this.add.graphics()
    var progresBox = this.add.graphics()
    progresBox.fillStyle(0x222222, 0.8)
    progresBox.fillRect(width / 2 - 160, height / 2 + 30, 320, 50)

    // loading text
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 16,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    // percent text
    var percenText = this.make.text({
      x: width / 2,
      y: height / 2 + 56,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percenText.setOrigin(0.5, 0.5)

    // loading assets text
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    // update progress bar
    this.load.on('progress', function (value) {
      percenText.setText(parseInt(value * 100) + '%')
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(width / 2 - 150, height / 2 + 40, 300 * value, 30)
    })

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key)
    })

    // remove progress bar when complete
    this.load.on('complete', function () {
      progresBox.destroy()
      progressBar.destroy()
      assetText.destroy()
      loadingText.destroy()
      percenText.destroy()
    })
  }

  loadAssets () {
    this.load.image('title', 'assets/images/ui/title.png')
    this.load.image('cursor', 'assets/images/ui/cursor.png')
    this.load.image('blueButton1', 'assets/images/ui/blue_button02.png')
    this.load.image('blueButton2', 'assets/images/ui/blue_button03.png')
    this.load.tilemapTiledJSON('level1', 'assets/level/level1.json')
    this.load.image('base', 'assets/images/mapTile_095.png')
    this.load.image('enemy', 'assets/images/tank_dark.png')
    this.load.image('turret', 'assets/images/tank_red.png')
    this.load.spritesheet('mapPack_spritesheet', 'assets/images/mapPack_spritesheet.png', { frameWidth: 64, frameHeight: 64 })
  }

  create () {
    this.scene.start('Game')
  }
}
