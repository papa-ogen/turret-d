import Phaser from 'phaser'
import levelConfig from '../config/levelConfig'

export default class extends Phaser.GameObjects.Image {
  constructor (scene, x, y, path) {
    super(scene, x, y, 'enemy')

    this.scene = scene
    this.path = path
    this.hp = 0
    this.speed = 0
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() }

    this.scene.add.existing(this)
  }

  startOnPath () {
    this.hp = levelConfig.initial.enemyHealth + levelConfig.incremental.enemyHealth
    this.speed = levelConfig.initial.enemySpeed * levelConfig.incremental.enemySpeed

    this.follower.t = 0
    // get x and y of the given t point
    this.path.getPoint(this.follower.t, this.follower.vec)
    // set the x and y of our enemy to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
  }

  update (time, delta) {
    this.follower.t += this.speed * delta

    this.path.getPoint(this.follower.t, this.follower.vec)

    if (this.follower.vec.y > this.y && this.follower.vec.y !== this.y) this.angle = 0
    if (this.follower.vec.x > this.x && this.follower.vec.x !== this.x) this.angle = -90
    if (this.follower.vec.y < this.y && this.follower.vec.y !== this.y) this.angle = 0
    if (this.follower.vec.x < this.x && this.follower.vec.x !== this.x) this.angle = 90

    this.setPosition(this.follower.vec.x, this.follower.vec.y)

    if (this.follower.t >= 1) {
      this.setActive(false)
      this.setVisible(false)
      this.scene.updateHealth(1)
    }
  }

  recieveDamage (damage) {
    this.hp -= damage

    if (this.hp <= 0) {
      this.setActive(false)
      this.setVisible(false)
      this.scene.updateScore(10)
    }
  }
}
