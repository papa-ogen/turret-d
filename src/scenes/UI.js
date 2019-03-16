import Phaser from 'phaser'
import levelConfig from '../config/levelConfig'
export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true })
  }

  init () {
    this.gameScene = this.scene.get('Game')
  }

  create () {
    this.setupUIElements()
    this.setupEvents()
  }

  setupUIElements () {
    this.scoreText = this.add.text(5, 5, 'Score: 0', { fontSize: '16px', fill: '#fff' })
    this.healthText = this.add.text(5, 30, 'Base Health: 0', { fontSize: '16px', fill: '#fff' })
    this.turretsText = this.add.text(5, 55, 'Available Turrets: 0', { fontSize: '16px', fill: '#fff' })
    this.roundTimeText = this.add.text(450, 5, 'Round Starts in: ' + levelConfig.initial.timeBetweenRounds, { fontSize: '16px', fill: '#fff' })
    this.enemiesText = this.add.text(5, 80, 'Enemies Remaining: 0', { fontSize: '16px', fill: '#fff' })
    this.levelText = this.add.text(0, 0, 'Level: 0', { fontSize: '40px', fill: '#fff' })

    const width = this.cameras.main.width
    const height = this.cameras.main.height

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, height / 2, width, height)
    )
    this.hideUIElements()
  }

  hideUIElements () {
    this.scoreText.alpha = 0
    this.healthText.alpha = 0
    this.turretsText.alpha = 0
    this.roundTimeText.alpha = 0
    this.enemiesText.alpha = 0
    this.levelText.alpha = 0
  }

  setupEvents () {
    this.gameScene.events.on('displayUI', () => {
      this.scoreText.alpha = 1
      this.healthText.alpha = 1
      this.turretsText.alpha = 1
      this.roundTimeText.alpha = 1
      this.enemiesText.alpha = 1
    })

    this.gameScene.events.on('updateScore', (score) => {
      this.scoreText.setText('Score: ' + score)
    })

    this.gameScene.events.on('updateHealth', (health) => {
      this.healthText.setText('Base Health: ' + health)
    })

    this.gameScene.events.on('updateTurrets', (turrets) => {
      this.turretsText.setText('Available Turrets: ' + turrets)
    })

    this.gameScene.events.on('updateEnemies', (enemies) => {
      this.enemiesText.setText('Enemies Remaining: ' + enemies)
    })

    this.gameScene.events.on('startRound', (level) => {
      this.levelText.setText('Level ' + level)
      this.levelText.alpha = 1

      this.add.tween({
        targets: this.levelText,
        ease: 'Sine.easeInOut',
        duration: 1000,
        delay: 2000,
        alpha: {
          getStart: () => 1,
          getEnd: () => 0
        },
        onComplete: () => {
          this.roundTimeText.setText('Round starts in: ' + levelConfig.initial.timeBetweenRounds)
          this.roundTimeText.alpha = 1

          const timedEvent = this.time.addEvent({
            delay: 1000,
            callbackScope: this,
            repeat: levelConfig.initial.timeBetweenRounds - 1,
            callback: function () {
              this.roundTimeText.setText('Round Starts in: ' + timedEvent.repeatCount)
              if (timedEvent.repeatCount === 0) {
                this.events.emit('roundReady')
                this.roundTimeText.alpha = 0
              }
            }
          })
        }
      })
    })
  }
}
