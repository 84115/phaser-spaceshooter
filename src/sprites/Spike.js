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

		this.timer = this.scene.time.addEvent({
			delay: 2000,
			callback: this.fire,
			callbackScope: this,
			loop: true
		});

		this.stunnable = false;
	}

	fire()
	{
		if (!this.timer.paused)
		{
			for (var i = 0; i < this.directions.length; i++)
			{
				this.bullet = this.projectile.get();

				if (this && this.bullet)
				{
					this.bullet.fire(this.x, this.y, this.directions[i]);
				}
			}
		}

		return this;
	}
}

export default SpikeSprite;
