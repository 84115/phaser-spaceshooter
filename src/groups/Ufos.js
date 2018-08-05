import Group from '../groups/Group';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class UfoGroup extends Group
{

	constructor(scene, tint, pattern, key='ufo')
	{
		super(scene);

		this.tweens = [];

		for (var i = 0; i <= 10; i++)
		{
			let sprite = new Enemy(this.scene, this.scene.grid[0], this.scene.grid[2 + i], key);

			sprite.index = i;

			sprite.getParent = () => this;

			sprite.projectile = this.scene.physics.add.group({
				classType: () => new Bullet(this.scene, 'bullet', 100, 250, true),
				maxSize: 10,
				runChildUpdate: true
			});

			sprite.timer = this.scene.time.addEvent({
				delay: 500,
				callback: () =>
				{
					if (!sprite.timer.paused)
					{
						sprite.bullet = sprite.projectile.get();

						if (sprite && sprite.bullet)
						{
							if (tint)
							{
								sprite.bullet.setTint(tint);
							}

							sprite.bullet.fire(sprite.x, sprite.y);
						}
					}
				},
				loop: true
			});

			if (tint)
			{
				sprite.setTint(tint);
			}

			this.add(sprite);

			this.tweens.push({
				targets: this.getChildrenHead(),
				x: this.scene.grid[12],
				ease: 'Power1',
				duration: 4000,
				offset: (1000 * (i + 1))
			});
		}

		this.timeline = this.scene.tweens.timeline({
			tweens: this.tweens,
			onComplete: () => this.clear(true)
		});
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

export default UfoGroup;
