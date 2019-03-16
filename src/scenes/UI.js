import Phaser from 'phaser'

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
    this.roundTimeText = this.add.text(450, 5, 'Round Starts in: 10', { fontSize: '16px', fill: '#fff' })
    this.hideUIElements()
  }

  hideUIElements () {
    this.scoreText.alpha = 0
    this.healthText.alpha = 0
    this.turretsText.alpha = 0
    this.roundTimeText.alpha = 0
  }

  setupEvents () {
    this.gameScene.events.on('displayUI', (params) => {
      this.scoreText.alpha = 1
      this.healthText.alpha = 1
      this.turretsText.alpha = 1
      this.roundTimeText.alpha = 1
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

    this.gameScene.events.on('startRound', () => {
      this.roundTimeText.alpha = 1

      const timedEvent = this.time.addEvent({
        delay: 1000,
        callbackScope: this,
        repeat: 9,
        callback: function () {
          this.roundTimeText.setText('Round Starts in: ' + timedEvent.repeatCount)
          if (timedEvent.repeatCount === 0) {
            this.events.emit('roundReady')
            this.roundTimeText.alpha = 0
          }
        }
      })
    })
  }
}
