import SequencableGroup from '../groups/Sequencable';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class SpikeGroup extends SequencableGroup
{

	constructor(scene)
	{
		super(scene);

		this.sprite = new Enemy(this.scene, 6, 6, 'mine', 200);

		this.sprite.projectile = this.scene.physics.add.group({
			classType: () => new Bullet(this.scene, 'bullet', 2000, 50),
			maxSize: 8 * 8,
			runChildUpdate: true
		});

		this.sprite.directions = this.sprite.projectile.get().getDirections();

		this.sprite.timer = this.scene.time.addEvent({
			delay: 2000,
			callback: this.fire,
			callbackScope: this,
			loop: true
		});

		this.sprite.stunnable = false;

		this.add(this.sprite);
	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship, this.getChildren(), this.scene.ship.collideShipEnemy, null, this.scene.ship);
		this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);

		for (var i = 0; i < this.getChildren().length; i++)
		{
			this.scene.physics.add.collider(this.scene.ship, this.getChildren()[i].projectile, this.scene.ship.collideShipEnemy, null, this.scene.ship);
		}
	}

	fire()
	{
		if (!this.sprite.timer.paused)
		{
			for (var i = 0; i < this.sprite.directions.length; i++)
			{
				this.sprite.bullet = this.sprite.projectile.get();

				if (this.sprite && this.sprite.bullet)
				{
					this.sprite.bullet.fire(this.sprite.x, this.sprite.y, this.sprite.directions[i]);
				}
			}
		}

		return this;
	}

}

export default SpikeGroup;
