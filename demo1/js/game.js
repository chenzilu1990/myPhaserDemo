const screenW = 320 
const screenH = 568 


// ---------------预定义变量分割线--------------------


var config = {
	width :  screenW,
	height : screenH,
	backgroundColor : '00ff00',
	physics : {
		default : 'arcade',
		arcade : {
			debug : true,
			// setBounds : true
			gravity : {x : 0, y : 0}
		}
	},
	scene : {

		preload : preload,
		create : create,
		update : update,
		extend : {
			bullets : null,
			enemys : null,
			lastFired : 0,
			lastEnemy :  0
		}
	}

}

var game = new Phaser.Game(config)

var enemy1
var bg
var AKey
var player
var preTime = 0
var delate = 0
var speed = 100
var pool
var bullet1

function preload() {
	this.load.image('bg', './images/bg.jpg')
	this.load.image('enemy', './images/enemy.png')
	this.load.image('hero', './images/hero.png')
	this.load.image('bullet', './images/bullet.png')
}

function create() {
	// 敌人
	var Enemy = new Phaser.Class({
		Extends : Phaser.Physics.Arcade.Image,
		initialize : 
		function Enemy(scene){
			Phaser.Physics.Arcade.Image.call(this,scene,0,0,'enemy')


			this.setOrigin(0, 0)
			// this.x = Phaser.Math.Between(0, screenW - this.width) 
			// this.y = y
			this.speed = 0.4
			this.born = 0
			// scene.children.add(this)
		},

		// fire : function () {
			
		// },

		update : function(time, delta) {
			// console.log('*******')
			this.y += this.speed * delta
			this.born += delta
			if (this.born > 2000 ) {
				this.setActive(false)
				this.setVisible(false)
				// this.y = -this.height
				this.born = 0 
				// this.x = Phaser.Math.Between(0, screenW - this.width) 

			}
		}
	}) 

	// 子弹
	var Bullet = new Phaser.Class({
		Extends : Phaser.Physics.Arcade.Image,
		initialize :
		function Bullet (scene) {
			Phaser.Physics.Arcade.Image.call(this,scene,0,0,'bullet')
			this.speed = -0.5
			this.born = 0
			
		},

		fire : function (player) {
			this.setActive(true)
			this.setVisible(true)
			this.setPosition(player.x, player.y - player.height)
		},	

		update : function (time,delta) {

			this.y += this.speed * delta 
			// console.log(this.x)
			
			this.born += delta
			if (this.born >= 5000) {
				console.log(this)
				this.setActive(false)
				this.setVisible(false)
				this.born = 0
			}

		}


	})

	// 键盘输入
 	cursors = this.input.keyboard.createCursorKeys()
	

	
 	// 背景实例
	bg1 = this.add.sprite(0, 0, 'bg')
	bg1.setOrigin(0, 0).setScale(screenW /512, screenH / 512)
	bg2 = this.add.sprite(0, screenH, 'bg')
	bg2.setOrigin(0, 0).setScale(screenW /512, screenH / 512)
	// 玩家实例
	player = this.physics.add.sprite(screenW / 2 , screenH -10 , 'hero') 	
	player.y -= player.height / 2
	player.setCollideWorldBounds(true)
	player.setBounce(0)
		
	// 子弹池实例
	this.bullets = this.add.group({classType : Bullet, runChildUpdate : true})
	// 敌人池水实例
	this.enemys = this.add.group({classType : Enemy, runChildUpdate : true})
	

}

function update(time,delta) {
	// 敌人逻辑更新
	if (time > this.lastEnemy) {

		var enemy = this.enemys.get()
		enemy.x = Phaser.Math.Between(0, screenW - enemy.width)
		enemy.y = - enemy.height
		enemy.setActive(true)
		enemy.setVisible(true)
		this.lastEnemy = time + 600
	}
	// 背景逻辑更新
	if (bg1.y >= screenH) bg1.y = -screenH
	bg1.y += 2

	if (bg2.y >= screenH) bg2.y = -screenH
	bg2.y += 2

	
	// 键盘输入响应
	if (cursors.left.isDown) {
		player.setVelocityX(-speed)
	} else if (cursors.right.isDown) {
		player.setVelocityX(speed)	
	} else {

		player.setVelocityX(0)	
	}


	if (cursors.up.isDown) {
		player.setVelocityY(-speed)
	} else if (cursors.down.isDown) {
		player.setVelocityY(speed)	
	} else {

		player.setVelocityY(0)	
	}

	// 响应键盘输入发射子弹
	if (cursors.space.isDown && time > this.lastFired) {

		var bullet = this.bullets.get()	

		bullet.fire(player)
		this.lastFired = time + 100

	}
 

}
