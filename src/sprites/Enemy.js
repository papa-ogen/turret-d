import Phaser from 'phaser'

export default class extends Phaser.GameObjects.Image {
  constructor ({ scene, x, y, path }) {
    super(scene, x, y, 'enemy')

    this.scene = scene
    this.active = false
    this.health = 100
    this.speed = 1 / 10000
    this.path = path
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() }

    scene.add.existing(this)
  }

  startOnPath () {
    this.follower.t = 0
    // get x and y of the given t point
    this.path.getPoint(this.follower.t, this.follower.vec)
    // set the x and y of our enemy to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
  }

  update (time, delta) {
    console.log('update')
    this.follower.t += this.speed * delta
    // get the new x and y coordinates in vec
    this.path.getPoint(this.follower.t, this.follower.vec)
    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y)

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}
