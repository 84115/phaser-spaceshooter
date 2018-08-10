import TweenableGroup from '../groups/Tweenable';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class UfoGroup extends TweenableGroup
{

	constructor(scene, tint, pattern='leftToRight', key='ufo', health=100, weaponInterval=750)
	{
		super(scene);

		let data;

		if (typeof pattern === "string")
		{
			data = this.getSequence(pattern);
		}
		else
		{
			data = pattern;
		}

		for (var i = 0; i <= data.coords.length-1; i++)
		{
			let coord = data.coords[i];

			if (('ease' in coord) && typeof coord.duration == 'string')
			{
				var ease = coord.ease;
			}
			else
			{
				var ease = data.ease ? data.ease : 'Power1';
			}

			if (('duration' in coord) && typeof coord.duration == 'number')
			{
				var duration = coord.duration;
			}
			else
			{
				var duration = data.duration ? data.duration : 5000;
			}

			if (('offset' in coord) && typeof coord.offset == 'number')
			{
				var offset = coord.offset;
			}
			else
			{
				var offset = data.offset ? data.offset : 1000;
			}

			let sprite = new Enemy(this.scene, this.scene.grid[coord.start.x], this.scene.grid[coord.start.y], key, health);

			sprite.index = i;

			sprite.getParent = () => this;

			sprite.projectile = this.scene.physics.add.group({
				classType: () => new Bullet(this.scene, 'bullet', 100, 250),
				maxSize: 10,
				runChildUpdate: true
			});

			if (weaponInterval)
			{
				sprite.timer = this.scene.time.addEvent({
					delay: weaponInterval,
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
			}

			if (tint)
			{
				sprite.setTint(tint);
			}

			this.add(sprite);

			let tweens = [];

			tweens[0] = {
				targets: this.getChildrenHead(),
				ease: ease,
				duration: duration,
				offset: (duration * 0) + (offset * (i + 1))
			};
			// tweens[1] = {
			// 	targets: this.getChildrenHead(),
			// 	ease: ease,
			// 	duration: duration,
			// 	offset: (duration * 1) + (offset * (i + 1)),
			// 	x: this.scene.grid[6],
			// 	y: this.scene.grid[6],
			// };
			// tweens[2] = {
			// 	targets: this.getChildrenHead(),
			// 	ease: ease,
			// 	duration: duration,
			// 	offset: (duration * 2) + (offset * (i + 1)),
			// 	x: this.scene.grid[9],
			// 	y: this.scene.grid[9],
			// };

			if (('x' in coord.stop) && typeof coord.stop.x == 'number')
			{
				tweens[0].x = this.scene.grid[coord.stop.x];
			}

			if (('y' in coord.stop) && typeof coord.stop.y == 'number')
			{
				tweens[0].y = this.scene.grid[coord.stop.y];
			}

			// Can't loop, will be unstable,
			// so cap it to 5
			if (tweens[0]) this.tweens.push(tweens[0]);
			if (tweens[1]) this.tweens.push(tweens[1]);
			if (tweens[2]) this.tweens.push(tweens[2]);
			if (tweens[3]) this.tweens.push(tweens[3]);
			if (tweens[4]) this.tweens.push(tweens[4]);
		}

		this.createTimeline();
	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship, this.getChildren(), this.scene.ship.collideShipEnemy, null, this.scene.ship);
		this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);

		for (var i = 0; i < this.getChildren().length; i++)
		{
			if (this.getChildren()[i].projectile)
			{
				this.scene.physics.add.collider(this.scene.ship, this.getChildren()[i].projectile, this.scene.ship.collideShipEnemy, null, this.scene.ship);
			}
		}
	}

}

export default UfoGroup;
