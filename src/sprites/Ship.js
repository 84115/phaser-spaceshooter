import Sprite from '../sprites/Sprite';

class ShipSprite extends Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.setDepth(1);
		// this.setCollideWorldBounds(true);

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
	}

	update(controller, time, delta)
	{
		if (controller.left.isDown)
		{
			this.x -= this.speed * delta;
		}
		else if (controller.right.isDown)
		{
			this.x += this.speed * delta;
		}

		if (controller.up.isDown)
		{
			this.y -= this.speed * delta;
		}
		else if (controller.down.isDown)
		{
			this.y += this.speed * delta;
		}
	}

}

export default ShipSprite;
