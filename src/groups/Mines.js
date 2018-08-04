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

				this.add(this.scene.physics.add.sprite(pos, this.scene.grid[0], 'mine').setCircle(16));

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

							this.sequenceDone = true;
						}
					});
				}
			},
			loop: true
		});

		this.sequenceDone = false;
	}

	update(time, delta)
	{
		for (var i = 0; i < this.children.entries.length; i++)
		{
			let mine = this.children.entries[i];

			mine.y = mine.y + 2 + Math.round(mine.y/150);

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
		this.scene.physics.add.collider(this.scene.ship.bullets, this.children.entries, this.scene.ship.collideBulletEnemy, null, this.scene.ship);
		this.scene.ship.collider(this.children.entries, this.scene.ship.collideShipEnemy);
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
