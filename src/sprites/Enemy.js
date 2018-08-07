import Sprite from '../sprites/Sprite';

class EnemySprite extends Sprite
{

	constructor(scene, x, y, key, health=100)
	{
		super(scene, x, y, key);

		this.maxHealth = health;
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
			if (this.scene)
			{
				this.scene.add
					.sprite(this.x, this.y, 'explode')
					.anims.play('explode-anim');
			}

			if (this.disableBody)
			{
				this.disableBody(true, true);
			}

			this.destroy();
		}
	}

}

export default EnemySprite;
