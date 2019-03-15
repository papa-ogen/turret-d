import Phaser from 'phaser'

export default class extends Phaser.GameObjects.Image {
  constructor (scene, x, y, map) {
    super(scene, x, y, 'turret')

    this.scene = scene
    this.map = map
    this.nextTic = 0
    this.range = 100

    this.scene.add.existing(this)
  }

  update (time, delta) {
    if (time > this.nextTic) {
      this.fire()
      this.nextTic = time + 1000
    }
  }

  place (i, j) {
    this.y = j * 64 + 32
    this.x = i * 64 + 32
    this.map[i][j] = 1
  }

  fire () {
    const enemy = this.scene.getEnemy(this.x, this.y, this.range)

    if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, this.enemy.x, this.enemy.y)
      this.scene.add.addBullet(this.x, this.y, angle)
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
    }
  }
}
