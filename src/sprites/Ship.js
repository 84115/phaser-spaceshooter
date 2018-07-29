import Sprite from '../sprites/Sprite';
import Bullet from '../sprites/Bullet';

class ShipSprite extends Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.scene = scene;

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
		this.weapon.bullets = this.scene.physics.add.group({
			classType: () => new Bullet(this.scene),
			maxSize: 100,
			runChildUpdate: true
		});

		this.updateStat('health');
		this.updateStat('shield');
		this.updateStat('ammo');
		this.updateStat('bulletspeed');
		this.updateStat('speed');
		this.updateStat('lives');
	}

	update(time, delta)
	{
		if (this.scene.controller)
		{
			if (this.alive)
			{
				if (this.scene.controller.spacebar.isDown && time > this.lastFired)
				{
					var bullet = this.weapon.bullets.get();

					if (bullet)
					{
						bullet.fire(this.x, this.y - 10);

						this.lastFired = time + this.bulletspeed;

						this.scene.sfx.play('shot');
					}
				}
			}

			if (this.scene.controller.left.isDown)
			{
				this.x -= this.speed * delta;
			}
			else if (this.scene.controller.right.isDown)
			{
				this.x += this.speed * delta;
			}

			if (this.scene.controller.up.isDown)
			{
				this.y -= this.speed * delta;
			}
			else if (this.scene.controller.down.isDown)
			{
				this.y += this.speed * delta;
			}
		}
	}

	updateStat(stat="")
	{
		switch (stat)
		{

			case 'health':
				this.scene.stats.updateStat('health', this.health, this.maxHealth);
				break;

			case 'shield':
				this.scene.stats.updateStat('shield', this.shield, this.maxShield);
				break;

			case 'ammo':
				this.scene.stats.updateStat('ammo', null, this.weapon.bullets.maxSize);
				break;

			case 'bulletspeed':
				this.scene.stats.updateStat('bulletspeed', (1000 / this.bulletspeed) + '@sec');
				break;

			case 'speed':
				this.scene.stats.updateStat('speed', this.speed);
				break;

			case 'lives':
				this.scene.stats.updateStat('lives', this.lives);
			break;

			case 'score':
				this.scene.stats.updateStat('score', this.scene.score);
			break;

		}
	}

	damage(amount)
	{
		if (this.alive)
		{
			if (this.health && amount)
			{
				this.health = this.health - amount;
			}

			if (this.health > 0)
			{
				this.scene.sfx.play('meow');

				this.updateStat('health');
			}
			else
			{
				this.lifeLoss();
			}
		}
	}

	lifeLoss()
	{
		this.alive = false;
		this.health = 0;

		this.updateStat('health');

		if (this.lives > 0)
		{
			this.lives--;
		}

		this.alpha = 0.25;

		this.updateStat('lives');

		if (this.lives > 0)
		{
			this.scene.StageTitle(this.scene, "Dead m8");

			this.scene.time.addEvent({
				delay: 4000,
				callback: () =>
				{
					this.alive = true;
					this.alpha = 1;
					this.health = 50;

					this.updateStat('health');
				}
			});
		}
		else if (this.lives == 0 && !this.scene.gameover)
		{
			this.scene.gameover = true;

			this.scene.StageTitle(this, "GameOver");
		}
	}

	collider(b, callback)
	{
		this.scene.physics.add.collider(this, b, callback, null, this);
	}

	collideShipEnemy(ship, enemy)
	{
		if (ship.alive)
		{
			ship.damage(25);

			this.scene.sfx.play('meow');

			this.scene.add
				.sprite(enemy.x, enemy.y, 'explode')
				.anims.play('explode-anim');

			if (enemy.disableBody && enemy.destroy)
			{
				enemy.disableBody(true, true);
				enemy.destroy();
			}

			this.scene.cameras.main.shake(75);
		}
	}

	collideBulletEnemy(enemy, bullet)
	{
		this.scene.sfx.play('alien death');

		this.scene.incrementScore(100);

		bullet.destroy();

		this.scene.add
			.sprite(enemy.x, enemy.y, 'explode')
			.anims.play('explode-anim');

		enemy.disableBody(true, true);
		enemy.destroy();
	}

	collideShipPowerUps(ship, powerup)
	{
		this.scene.powerups.handle(powerup);

		powerup
			.disableBody(true, true)
			.destroy();

		this.scene.sfx.play('ping');
	}

}

export default ShipSprite;
