import Sprite from '../sprites/Sprite';

class EnemySprite extends Sprite
{

	constructor(scene, x, y, key, health=100)
	{
		super(scene, x, y, key);

		this.maxHealth = health;
		this.health = this.maxHealth;

		this.stunnable = true;

		this.trackObject = false;
	}

	damage(amount=0)
	{
		if (this.health && amount)
		{
			this.health = this.health - amount;
		}

		if (this.health <= 0)
		{
			this
				.explode()
				.kill();
		}
	}

	fire()
	{
		if (!this.timer.paused || !this.timer)
		{
			let bullet = this.projectile.get();

			if (bullet)
			{
				if (this.tintColor)
				{
					bullet.setTint(this.tintColor);
				}

				bullet.fire(this.x, this.y);
			}
		}

		return this;
	}

	startWeaponTimer(weaponInterval)
	{
		if (weaponInterval)
		{
			this.timer = this.scene.time.addEvent({
				delay: weaponInterval,
				callback: this.fire,
				callbackScope: this,
				loop: true
			});
		}
	}

	update(time, delta)
	{
		if (this.trackObject)
		{
			this.followSpriteAngle(this.trackObject);
		}
	}

}

export default EnemySprite;
