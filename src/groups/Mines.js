import Enemy from '../sprites/Enemy';
import Group from '../groups/Group';

class MinesGroup extends Group
{

	constructor(scene, limit=100, interval=1000)
	{
		super(scene);

		this.prev = [];
		this.count = 0;
		this.sequenceDone = false;

		if (this.scene.background.scroll)
		{
			this.scene.background.scroll = this.scene.background.scrollBase * 12;
		}

		this.scene.ship.bullets.enabled = false;

		this.timer = this.scene.time.addEvent({
			delay: interval,
			callback: () =>
			{
				var pos = this.scene.grid.randomX();

				for (var i = 0; i <= 11; i++)
				{
					if (this.prev.includes(pos))
					{
						var pos = this.scene.grid.randomX();
					}
				}

				this.prev.unshift(pos);
				this.prev = this.prev.slice(0, 11);

				// new Enemy(this.scene, // does not have setCircle, look into adding it to sprite
				let mine = new Enemy(this.scene, pos, this.scene.grid[0], 'mine').setCircle(16);
				mine.speed = Phaser.Math.GetSpeed(Phaser.Math.RND.between(175, 225), 1);

				this.add(mine);

				this.count++;

				if (this.count >= limit)
				{
					this.timer.remove(false);
					this.prev = [];
					this.count = 0;

					this.scene.time.addEvent({
						delay: 4000,
						callback: () =>
						{
							this.scene.background.scroll = this.scene.background.scrollBase;

							this.scene.ship.bullets.enabled = true;

							this.clear();

							this.sequenceDone = true;
						}
					});
				}
			},
			loop: true
		});
	}

	update(time, delta)
	{
		for (var i = 0; i < this.getChildren().length; i++)
		{
			let mine = this.getChildren()[i];

			mine.y += mine.speed * delta;

			if (mine.y >= 640 + 32)
			{
				mine
					.disableBody(true, true)
					.destroy();
			}
		}
	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);
		this.scene.ship.collider(this.getChildren(), this.scene.ship.collideShipEnemy);
	}

	done()
	{
		if (this.sequenceDone)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

}

export default MinesGroup;
