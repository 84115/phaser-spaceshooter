import PlayerSprite from '../sprites/Player';
import ShipBullet from '../sprites/ShipBullet';

class ShipSprite extends PlayerSprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.speed = Phaser.Math.GetSpeed(150, 1);

		this.body.setCircle(14);

		this.maxHealth = 100;
		this.health = this.maxHealth;

		this.maxShield = 150;
		this.shield = this.maxShield;

		this.bullets = this.scene.physics.add.group({
			classType: () => new ShipBullet(this.scene, 'bullet-2', 100, 400, 'up'),
			maxSize: 100,
			runChildUpdate: true
		});
		this.bullets.enabled = true;
		this.bullets.speed = 250;
		this.bullets.lastFired = 0;
		this.bullets.tint;

		this.updateStat('health');
		this.updateStat('shield');
		this.updateStat('ammo');
		this.updateStat('bulletspeed');
		this.updateStat('speed');
		this.updateStat('lives');
	}

	update(time, delta)
	{
		if (this.alive)
		{
			if (this.scene.controller.spacebar.isDown && time > this.bullets.lastFired)
			{
				var bullet = this.bullets.get();

				if (bullet && this.bullets.enabled)
				{
					bullet.fire(this.x, this.y - 10);

					this.bullets.lastFired = time + this.bullets.speed;

					this.updateStat('ammo');

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
				this.scene.stats.updateStat('ammo', this.bullets.children.size, this.bullets.maxSize);
				break;

			case 'bulletspeed':
				this.scene.stats.updateStat('bulletspeed', (1000 / this.bullets.speed) + '@sec');
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
			super.damage(amount);

			if (this.health > 0)
			{
				this.scene.sfx.play('meow');

				this.updateStat('health');
			}
			else
			{
				this.kill();
			}
		}
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

			if (enemy.disableBody)
			{
				enemy.disableBody(true, true);
			}

			enemy.destroy();

			this.scene.cameras.main.shake(75);
		}
	}

	collideBulletEnemy(enemy, bullet)
	{
		this.scene.sfx.play('alien death');

		this.scene.incrementScore(100);

		if (!this.bullets.pierce)
		{
			bullet.destroy();
		}

		if (enemy.timer && enemy.stunnable)
		{
			enemy.timer
				.remove(false);
		}

		if (this.bullets.poisoned)
		{
			enemy.setTint(0xffff00);

			if (!enemy.poisonTimer)
			{
				enemy.poisonTimer = this.scene.time.addEvent({
					delay: 500,
					callback: () => enemy.damage(25),
					loop: true
				});
			}
		}

		if (this.bullets.frozen)
		{
			if (enemy.setTint)
			{
				enemy.setTint(0x00ffff);
			}

			if (enemy.timer)
			{
				enemy.timer.paused = true;
			}

			if (enemy.getParent)
			{
				enemy.getParent().timeline.data[enemy.index].pause();
			}
		}

		enemy.damage(75);

		if (!enemy.hitTween && enemy.stunnable)
		{
			enemy.hitTween = this.scene.tweens.add({
				targets: enemy,
				y: enemy.y + 10,
				duration: 5000,
				ease: enemy.wiggleEase
			});
		}
	}

	collideBulletEnemyBullet(enemy, bullet)
	{
		this.scene.sfx.play('alien death');

		this.scene.incrementScore(5);

		bullet.destroy();
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
