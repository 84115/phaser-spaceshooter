import Sprite from 'Sprite';

class ShipSprite extends Sprite
{

	create()
	{
		this.setDepth(1)
			.setCollideWorldBounds(true);

		this.alive = true;
		this.lives = 3;
		this.speed = Phaser.Math.GetSpeed(150, 1);
		this.health = 50;
		this.maxHealth = 100;
		this.shield = 0;
		this.maxShield = 150;
		this.lastFired = 0;
		this.lastFiredAlt = 0;
		this.bulletspeed = 250;
		this.bulletspeedAlt = 1000;

		this.weapon = {};

		// this.weapon.bullets = this.physics.add.group({
		// 	classType: Bullet(),
		// 	maxSize: 100,
		// 	runChildUpdate: true
		// });

		// this.weapon.bulletsAlt = this.physics.add.group({
		// 	classType: Bullet('brain', 500, 200),
		// 	maxSize: 1,
		// 	runChildUpdate: true
		// });

		this.createInput();
	}

	createInput()
	{
		var code = Phaser.Input.Keyboard.KeyCodes;

		this.key = {
			cursor: {
				up: this.input.keyboard.addKey(code.W),
				left: this.input.keyboard.addKey(code.A),
				down: this.input.keyboard.addKey(code.S),
				right: this.input.keyboard.addKey(code.D)
			},
			spacebar: this.input.keyboard.addKey(code.SPACE),
			Q: this.input.keyboard.addKey(code.Q),
			K: this.input.keyboard.addKey(code.K),
			L: this.input.keyboard.addKey(code.L)
		};

		return this;
	}

	damage(damage)
	{
		// ...
	}

}

export default ShipSprite;
