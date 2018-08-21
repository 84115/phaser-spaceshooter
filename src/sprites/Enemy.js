import Sprite from '../sprites/Sprite';

class EnemySprite extends Sprite
{

	constructor(scene, x, y, key, health=100)
	{
		super(scene, x, y, key);

		this.maxHealth = health;
		this.health = this.maxHealth;

		this.stunnable = true;
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
			this.bullet = this.projectile.get();

			if (this.bullet)
			{
				if (this.tint)
				{
					this.bullet.setTint(this.tint);
				}

				this.bullet.fire(this.x, this.y);
			}
		}

		return this;
	}

}

export default EnemySprite;
