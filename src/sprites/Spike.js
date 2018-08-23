import EnemySprite from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class SpikeSprite extends EnemySprite
{

	constructor(scene, x, y, key, health=100)
	{
		super(scene, x, y, key);

		this.projectile = this.scene.physics.add.group({
			classType: () => new Bullet(this.scene, 'bullet', 2000, 50),
			maxSize: 8 * 8,
			runChildUpdate: true
		});

		this.directions = this.projectile.get().getDirections();

		this.stunnable = false;
	}

	fire()
	{
		if (!this.timer.paused)
		{
			for (var i = 0; i < this.directions.length; i++)
			{
				let bullet = this.projectile.get();

				if (this && bullet)
				{
					bullet.fire(this.x, this.y, this.directions[i]);
				}
			}
		}

		return this;
	}
}

export default SpikeSprite;
