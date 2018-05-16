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
		update : update
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

function preload() {
	this.load.image('enemy', './images/enemy.png')
	this.load.image('bg', './images/bg.jpg')
	this.load.image('hero', './images/hero.png')
	this.load.image('bullet', './images/bullet.png')
}

function create() {

	var Enemy = new Phaser.Class({
		Extends : Phaser.GameObjects.Sprite,
		initialize : 
		function Enemy(scene,y){
			Phaser.GameObjects.Sprite.call(this,scene,0,0,'enemy')
			// this.setTexture('enemy')

			this.setOrigin(0, 0)
			this.x = Phaser.Math.Between(0, screenW - this.width) 
			this.y = y
			this.speed = 5
			scene.children.add(this)
		},

		update : function() {
			this.y += this.speed
			if (this.y > screenH ) {
				this.y = -this.height 
				this.x = Phaser.Math.Between(0, screenW - this.width) 

			}
		}
	}) 


	

	var Pool = new Phaser.Class({
		Extends : Phaser.GameObjects.Group,
		initialize : 
		function Pool (scene) {
		 	Phaser.GameObjects.Group.call(this,scene)
		 	this.bulletPool = []
		 	// this.scene = scene
		} ,

		createBullet : function(x, y, key) {
			
			if (this.bulletPool.length === 0) {

				return	this.scene.physics.add.sprite(x, y, key).setVelocityY(-500)		 
			} else {
				var bullet = this.bulletPool[0]
				bullet.setPosition(x,y)
				// bullet.x = x
				// bullet.y = y
				bullet.setVelocityY(-500)
				return bullet
			}

		}

		// update : function  () {
		// 	console.log('*********')
		// }
		 
	})

		pool = new Pool(this)

		bg1 = this.add.sprite(0, 0, 'bg')
		bg1.setOrigin(0, 0).setScale(screenW /512, screenH / 512)
		bg2 = this.add.sprite(0, screenH, 'bg')
		bg2.setOrigin(0, 0).setScale(screenW /512, screenH / 512)


 		enemy1 = new Enemy(this, 0)
 		enemy2 = new Enemy(this, - screenH / 4)
 		enemy3 = new Enemy(this, - screenH / 2)
 		enemy4 = new Enemy(this, - (3 * screenH) / 4)
 	

		player = this.physics.add.sprite(screenW / 2 , screenH -10 , 'hero') 	

		player.y -= player.height / 2

		player.setCollideWorldBounds(true)
		player.setBounce(0)
 		

 		AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
 		cursors = this.input.keyboard.createCursorKeys()

 	


		

}

function update(time,delta) {
	// console.log(this.time.now %  1000)
	// console.log(time,delta)
	if (bg1.y >= screenH) bg1.y = -screenH
	bg1.y += 2

	if (bg2.y >= screenH) bg2.y = -screenH
	bg2.y += 2

	// 

	if (AKey.isDown) {

		player.setVelocityX(-speed)
	}

	if (cursors.left.isDown) {
		player.setVelocityX(-speed)
	} else if (cursors.right.isDown) {
		player.setVelocityX(speed)	
	} else {
		// console.log('up')
		player.setVelocityX(0)	
	}


	if (cursors.up.isDown) {
		player.setVelocityY(-speed)
	} else if (cursors.down.isDown) {
		player.setVelocityY(speed)	
	} else {
		// console.log('up')
		player.setVelocityY(0)	
	}


	if (cursors.space.isDown) {

		delate += (time - preTime)

		if (delate >= 500) {
			var bullet1 = pool.createBullet(player.x , player.y - player.height /2 ,'bullet')


			// bullet1.visible = false
			delate = 0
		}
		preTime = time


	}


	// enemy1.update()
	// enemy2.update()
	// enemy3.update()
	// enemy4.update()

}
