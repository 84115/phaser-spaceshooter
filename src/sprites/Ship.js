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
		this.bullets.speed = 200;
		this.bullets.lastFired = 0;
		this.bullets.tint;

		this.updateStat('health');
		this.updateStat('shield');
		this.updateStat('ammo');
		this.updateStat('bulletspeed');
		this.updateStat('speed');
		this.updateStat('lives');

		this.prop = this.scene.props.addFolder("Ship");
		this.prop.add(this, 'health');
		this.prop.add(this, 'shield');
		this.prop.add(this, 'speed').onChange(this.set('speed'));
		this.prop.add(this, 'alive').onChange(this.revive);
		// this.prop.add(this, 'tint').onChange(this.setTint);

		this.propB = this.scene.props.addFolder("Weapon");
		this.propB.add(this.bullets, 'enabled');
		this.propB.add(this.bullets, 'speed');
	}

	update(time, delta)
	{
		if (this.alive)
		{
			if (this.scene.controller.spacebar.isDown && time > this.bullets.lastFired)
			{
				var bullet = this.bullets.get();

				if (false)
				{
				}
				else if (this.scene.controller.upWeapon.isDown && this.scene.controller.leftWeapon.isDown)
				{
					bullet.direction = "upLeft";
				}
				else if (this.scene.controller.upWeapon.isDown && this.scene.controller.rightWeapon.isDown)
				{
					bullet.direction = "upRight";
				}
				else if (this.scene.controller.downWeapon.isDown && this.scene.controller.leftWeapon.isDown)
				{
					bullet.direction = "downLeft";
				}
				else if (this.scene.controller.downWeapon.isDown && this.scene.controller.rightWeapon.isDown)
				{
					bullet.direction = "downRight";
				}
				else if (this.scene.controller.upWeapon.isDown)
				{
					bullet.direction = "up";
				}
				else if (this.scene.controller.downWeapon.isDown)
				{
					bullet.direction = "down";
				}
				else if (this.scene.controller.leftWeapon.isDown)
				{
					bullet.direction = "left";
				}
				else if (this.scene.controller.rightWeapon.isDown)
				{
					bullet.direction = "right";
				}
				else
				{
					bullet.direction = "up";
				}

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
				this.scene.stats.updateStat('bulletspeed', (1000 / this.bullets.speed) + '@s');
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

		// Refactor then move function to Enemy class
		if (enemy.timer && enemy.stunnable)
		{
			enemy.timer
				.remove(false);
		}

		// Refactor then move function to Enemy class
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

		// Refactor then move function to Enemy class
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

		// Refactor then move function to Enemy class
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
