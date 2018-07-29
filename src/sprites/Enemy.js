import Sprite from '../sprites/Sprite';

class EnemySprite extends Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.maxHealth = 100;
		this.health = this.maxHealth;
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
				.disableBody(true, true)
				.destroy();
		}
	}

}

export default EnemySprite;
