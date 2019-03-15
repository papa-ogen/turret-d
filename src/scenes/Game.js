import Phaser from 'phaser'
import map from '../config/map'

export default class extends Phaser.Scene {
  constructor () {
    super('Game')
  }
  init () {
    this.map = map.map((arr) => {
      return arr.slice()
    })
  }

  create () {
    this.createMap()
    this.createPath()
    this.createCursor()
  }

  createMap () {
    // create our map
    this.bgMap = this.make.tilemap({ key: 'level1' })
    // add tileset image
    this.tiles = this.bgMap.addTilesetImage('mapPack_spritesheet')
    // create our background layer
    this.waterLayer = this.bgMap.createStaticLayer('Water', this.tiles, 0, 0)
    this.backgroundLayer = this.bgMap.createStaticLayer('Ground', this.tiles, 0, 0)
    this.roadLayer = this.bgMap.createStaticLayer('Road', this.tiles, 0, 0)
    this.detailsLayer = this.bgMap.createStaticLayer('Details', this.tiles, 0, 0)
    // add tower
    this.add.image(222, 680, 'base')
  }

  createPath () {
    this.graphics = this.add.graphics()
    this.path = this.add.path(288, -32)
    this.path.lineTo(288, 224)
    this.path.lineTo(416, 224)
    this.path.lineTo(416, 480)
    this.path.lineTo(225, 480)
    this.path.lineTo(225, 720)

    this.graphics.lineStyle(3, 0xffffff, 1)
    this.path.draw(this.graphics)
  }

  createCursor () {
    this.cursor = this.add.image(32, 32, 'cursor')
    this.cursor.setScale(2)
    this.cursor.alpha = 0

    this.input.on('pointermove', (pointer) => {
      const i = Math.floor(pointer.y / 64)
      const j = Math.floor(pointer.x / 64)

      if (this.canPlaceTurret(i, j)) {
        this.cursor.setPosition(j * 64 + 32, i * 64 + 32)
        this.cursor.alpha = 0.8
      } else {
        this.cursor.alpha = 0
      }
    })
  }

  canPlaceTurret (i, j) {
    return this.map[i][j] === 0
  }
}
