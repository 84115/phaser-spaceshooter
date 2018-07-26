import Sprite from '../sprites/Sprite';

function Bullet(texture='bullet', damage=100, speed=400, reverse=false)
{
	if (reverse)
	{
		speed = -speed;
	}

	return new Phaser.Class({
		Extends: Phaser.GameObjects.Sprite,

		initialize: function(scene)
		{
			Phaser.GameObjects.Sprite.call(this, scene, 0, 0, texture);

			this.speed = Phaser.Math.GetSpeed(speed, 1);
		},

		fire: function(x, y)
		{
			this.setPosition(x, y)
				.setActive(true)
				.setVisible(true);
		},

		update: function(time, delta)
		{
			if (reverse)
			{
				var cond = this.y > 640 + 50;
			}
			else
			{
				var cond = this.y < -50;
			}

			this.y -= this.speed * delta;

			if (cond)
			{
				this.setActive(false)
					.setVisible(false);
			}
		}
	});
};

class ShipSprite extends Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		// this.setDepth(1);
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

		this.weapon.bullets = scene.physics.add.group({
			classType: Bullet(),
			maxSize: 100,
			runChildUpdate: true
		});

		// this.weapon.bulletsAlt = scene.physics.add.group({
		// 	classType: Bullet('brain', 500, 200),
		// 	maxSize: 1,
		// 	runChildUpdate: true
		// });
	}

	update(controller, time, delta)
	{
		if (controller)
		{
			if (controller.spacebar.isDown && time > this.lastFired)
			{
				var bullet = this.weapon.bullets.get();

				if (bullet)
				{
					bullet.fire(this.x, this.y);

					this.lastFired = time + this.bulletspeed;

					// self.fx.play('shot');
				}
			}

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

}

export default ShipSprite;
