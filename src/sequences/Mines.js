import Group from '../groups/Group';

class MinesSequence extends Group
{
	constructor(scene, limit=100, interval=1000)
	{
		super(scene);

		this.prev = [];
		this.count = 0;
	}

	update()
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

		if (scene.background.scroll)
		{
			scene.background.scroll = scene.background.scroll * 12;
		}

		this.scene.ship.bullets.enabled = false;

		this.timer = scene.time.addEvent({
			delay: interval,
			callback: () =>
			{
				var pos = scene.grid.randomX();

				for (var i = 0; i <= 11; i++)
				{
					if (this.prev.includes(pos))
					{
						var pos = scene.grid.randomX();
					}
				}

				this.prev.unshift(pos);
				this.prev = this.prev.slice(0, 11);

				this.add(scene.physics.add.sprite(pos, scene.grid[0], 'mine').setCircle(16));

				this.count++;

				if (this.count >= limit)
				{
					this.timer.remove(false);
					this.__done = true;
					this.prev = [];
					this.count = 0;

					scene.time.addEvent({
						delay: 4000,
						callback: () =>
						{
							scene.background.scroll = scene.background.scrollBase;

							this.scene.ship.bullets.enabled = true;
						}
					});
				}

				console.log(this.done());
			},
			loop: true
		});

		this.__done = false;
	}

	done()
	{
		if (this.__done)
		{
			return true;
		}

		return false;
	}

}

export default MinesSequence;
