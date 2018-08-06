import Group from '../groups/Group';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class UfoGroup extends Group
{

	constructor(scene, tint, pattern='leftToRight', key='ufo')
	{
		super(scene);

		this.tweens = [];

		let data = this.getSequence(pattern);

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

			let sprite = new Enemy(this.scene, this.scene.grid[coord.start.x], this.scene.grid[coord.start.y], key);

			sprite.index = i;

			sprite.getParent = () => this;

			sprite.projectile = this.scene.physics.add.group({
				classType: () => new Bullet(this.scene, 'bullet', 100, 250, true),
				maxSize: 10,
				runChildUpdate: true
			});

			sprite.timer = this.scene.time.addEvent({
				delay: 750,
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

			let tween = {
				targets: this.getChildrenHead(),
				ease: ease,
				duration: duration,
				offset: (offset * (i + 1))
			};

			if (('x' in coord.stop) && typeof coord.stop.x == 'number')
			{
				tween.x = this.scene.grid[coord.stop.x];
			}

			if (('y' in coord.stop) && typeof coord.stop.y == 'number')
			{
				tween.y = this.scene.grid[coord.stop.y];
			}

			this.tweens.push(tween);
		}

		this.timeline = this.scene.tweens.timeline({
			tweens: this.tweens,
			// todo, look into clear and if it stops timer, if not add that to kill?
			// also only clear if offscreen
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

	getSequence(key)
	{
		var table = {
			"leftToRight": {
				ease: 'Power1',
				duration: 5000,
				offset: 1000,
				coords: [
					{ start: { x: 0, y: 2 }, stop: { x: 12, y: 2 } },
					{ start: { x: 0, y: 3 }, stop: { x: 12, y: 3 } },
					{ start: { x: 0, y: 4 }, stop: { x: 12, y: 4 } },
					{ start: { x: 0, y: 5 }, stop: { x: 12, y: 5 } },
					{ start: { x: 0, y: 6 }, stop: { x: 12, y: 6 } },
					{ start: { x: 0, y: 7 }, stop: { x: 12, y: 7 } },
					{ start: { x: 0, y: 8 }, stop: { x: 12, y: 8 } },
					{ start: { x: 0, y: 9 }, stop: { x: 12, y: 9 } },
				]
			},

			"rightToLeft": {
				ease: 'Power1',
				duration: 5000,
				offset: 1000,
				coords: [
					{ start: { x: 12, y: 2 }, stop: { x: 0, y: 2 } },
					{ start: { x: 12, y: 3 }, stop: { x: 0, y: 3 } },
					{ start: { x: 12, y: 4 }, stop: { x: 0, y: 4 } },
					{ start: { x: 12, y: 5 }, stop: { x: 0, y: 5 } },
					{ start: { x: 12, y: 6 }, stop: { x: 0, y: 6 } },
					{ start: { x: 12, y: 7 }, stop: { x: 0, y: 7 } },
					{ start: { x: 12, y: 8 }, stop: { x: 0, y: 8 } },
					{ start: { x: 12, y: 9 }, stop: { x: 0, y: 9 } },
				]
			},
			"crossroad": {
				ease: 'Power1',
				duration: 3000,
				offset: 300,
				coords: [
					{ start: { x: 12, y: 2 }, stop: { x: 0, y: 2 } },
					{ start: { x: 0, y: 3 }, stop: { x: 12, y: 3 } },
					{ start: { x: 12, y: 4 }, stop: { x: 0, y: 4 } },
					{ start: { x: 0, y: 5 }, stop: { x: 12, y: 5 } },
					{ start: { x: 12, y: 6 }, stop: { x: 0, y: 6 } },
					{ start: { x: 0, y: 7 }, stop: { x: 12, y: 7 } },
					{ start: { x: 12, y: 8 }, stop: { x: 0, y: 8 } },
					{ start: { x: 0, y: 9 }, stop: { x: 12, y: 9 } },
				]
			},
			"wip": {
				ease: 'Power1',
				duration: 6000,
				offset: 1000,
				coords: [
					{ start: { x: 0, y: 0 }, stop: { x: 7, y: 19 } },
					{ start: { x: 12, y: 0 }, stop: { x: 5, y: 19 } },

					{ start: { x: 0, y: 0 }, stop: { x: 8, y: 18 } },
					{ start: { x: 12, y: 0 }, stop: { x: 4, y: 18 } },

					{ start: { x: 0, y: 0 }, stop: { x: 9, y: 17 } },
					{ start: { x: 12, y: 0 }, stop: { x: 3, y: 17 } },

					{ start: { x: 0, y: 0 }, stop: { x: 10, y: 16 } },
					{ start: { x: 12, y: 0 }, stop: { x: 2, y: 16 } },
				]
			},
		};

		return table[key];
	}

}

export default UfoGroup;
