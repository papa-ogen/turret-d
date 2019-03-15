import Phaser from 'phaser'

// import Enemy from '../sprites/Enemy'

export default class extends Phaser.Scene {
  constructor () {
    super('Game')
  }
  init () {}
  preload () {}

  create () {
    this.createMap()
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
    // this.add.image(480, 480, 'base');
  }
}
