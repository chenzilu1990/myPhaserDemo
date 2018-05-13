const screenW = 320 
const screenH = 568 


// ---------------预定义变量分割线--------------------


var config = {
	width :  screenW,
	height : screenH,
	backgroundColor : '00ff00',
	scene : {

		preload : preload,
		create : create,
		update : update
	}
}

var game = new Phaser.Game(config)
var enemy1

function preload() {
	this.load.image('enemy', './images/enemy.png')
	
}

function create() {

	var Enemy = new Phaser.Class({
		Extends : Phaser.GameObjects.Sprite,
		initialize : 
		function Enemy(scene,y){
			Phaser.GameObjects.Sprite.call(this,scene)
			this.setTexture('enemy')
			// this.setSize(screenW / 5, this.height)
			this.setOrigin(0, 0)
			this.x = Phaser.Math.Between(0, screenW - this.width) 
			this.y = y
			this.speed = 10
			scene.children.add(this)
		},

		update : function() {
			this.y += this.speed
			if (this.y > screenH ) {
				this.y = -this.height 
				this.x = Phaser.Math.Between(0, screenW - this.width) 
				// console.log(Phaser.Math.Between(0,3))
			}
		}
	}) 


	// var enemyConfig = {
	// 	key : 'enemy',
	// 	x	: 0,
	// 	y 	: 0
	// }
 // 	enemy = this.make.sprite(enemyConfig).setOrigin(0,0)
 // 	enemy.x = Phaser.Math.Between(0,2) * enemy.width
 		enemy1 = new Enemy(this,0)
 		enemy2 = new Enemy(this,- screenH / 4)
 		enemy3 = new Enemy(this, - screenH / 2)
 		enemy4 = new Enemy(this ,- (3 * screenH) / 4)
 	

}

function update() {
	// enemy.y += 5
	// if (enemy.y > screenH ) {
	// 	enemy.y = -enemy.height 
	// 	enemy.x = Phaser.Math.Between(0,2) * enemy.width
	// }
	enemy1.update()
	enemy2.update()
	enemy3.update()
	enemy4.update()

}
