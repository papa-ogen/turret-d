import Phaser from 'phaser'
import map from '../config/map'
import Enemy from '../sprites/Enemy'
import Turret from '../sprites/Turret'

export default class extends Phaser.Scene {
  constructor () {
    super('Game')
  }
  init () {
    this.map = map.map((arr) => {
      return arr.slice()
    })

    this.nextEnemy = 0
  }

  create () {
    this.createMap()
    this.createPath()
    this.createCursor()
    this.createGroups()
  }

  update (time, delta) {
    console.log(time > this.nextEnemy)
    if (time > this.nextEnemy) {
      let enemy = this.enemies.getFirstDead()

      if (!enemy) {
        enemy = new Enemy(this, 0, 0, this.path)
        this.enemies.add(enemy)
      }

      if (enemy) {
        enemy.setActive(true)
        enemy.setVisible(true)
        enemy.startOnPath()
      }

      this.nextEnemy = time + 2000
    }
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

  createGroups () {
    this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true })
    this.turrets = this.add.group({ classType: Turret, runChildUpdate: true })

    this.input.on('pointerdown', this.placeTurret.bind(this))
  }

  getEnemy () {
    return false
  }

  addBullet () {

  }

  placeTurret (pointer) {
    const i = Math.floor(pointer.y / 64)
    const j = Math.floor(pointer.x / 64)

    if (this.canPlaceTurret(i, j)) {
      let turret = this.turrets.getFirstDead()

      if (!turret) {
        turret = new Turret(this, 0, 0, this.map)
        this.turrets.add(turret)
      }

      turret.setActive(true)
      turret.setVisible(true)
      turret.place(i, j)
    }
  }
}
