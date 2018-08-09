import Group from '../groups/Group';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class SpikeGroup extends Group
{

	constructor(scene)
	{
		super(scene);

		let sprite = new Enemy(
			this.scene,
			this.scene.grid[6],
			this.scene.grid[6],
			'mine',
			200
		);

		sprite.projectile = this.scene.physics.add.group({
			classType: () => new Bullet(this.scene, 'bullet', 2000, 50),
			maxSize: 8*8,
			runChildUpdate: true
		});

		sprite.directions = sprite.projectile.get().getDirections();

		sprite.timer = this.scene.time.addEvent({
			delay: 2000,
			callback: () =>
			{
				if (!sprite.timer.paused)
				{
					for (var i = 0; i < sprite.directions.length; i++)
					{
						sprite.bullet = sprite.projectile.get();

						if (sprite && sprite.bullet)
						{
							sprite.bullet.fire(sprite.x, sprite.y, sprite.directions[i]);
						}
					}
				}
			},
			loop: true
		});

		sprite.stunnable = false;

		this.add(sprite);
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

}

export default SpikeGroup;
