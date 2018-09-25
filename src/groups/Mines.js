import Group from '../groups/Group';
import Enemy from '../sprites/Enemy';

class MinesGroup extends Group
{

	constructor(scene, config={})
	{
		super(scene);

		this.key = config.key || "mine";
		this.tint = config.tint || null;
		this.limit = config.limit || 100;
		this.interval = config.interval || 1000;
		this.disableWeapon = config.disableWeapon || false;

		this.prev = [];
		this.count = 0;
		this.sequenceDone = false;

		if (this.scene.background.scroll)
		{
			this.scene.background.scroll = this.scene.background.scrollBase * 12;
		}

		if (this.disableWeapon)
		{
			this.scene.ship.bullets.enabled = false;
		}

		this.timer = this.scene.time.addEvent({
			delay: this.interval,
			callback: this.animate,
			callbackScope: this,
			loop: true
		});
	}

	update(time, delta)
	{
		for (let child of this)
		{
			child.y += child.speed * delta;

			if (
				// child.x <= 0 - 32 ||
				// child.x >= 320 + 32 ||
				child.y <= 0 - 32 ||
				child.y >= 640 + 32
			)
			{
				child.kill();
			}
		}
	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);
		this.scene.ship.collider(this.getChildren(), this.scene.ship.collideShipEnemy);

		return this;
	}

	done()
	{
		return Boolean(this.sequenceDone);
	}

	animate()
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

		let mine = new Enemy(this.scene, pos, this.scene.grid[0], this.key);
		mine.speed = Phaser.Math.GetSpeed(Phaser.Math.RND.between(175, 225), 1);
		mine.maxHealth = 1;
		mine.health = mine.maxHealth;

		if (this.tint)
		{
			mine.setTint(mine);
		}

		this.add(mine);

		this.count++;

		if (this.count >= this.limit)
		{
			this.timer.remove(false);
			this.prev = [];
			this.count = 0;

			this.scene.time.addEvent({
				delay: 4000,
				callback: () =>
				{
					this.scene.background.scroll = this.scene.background.scrollBase;

					if (this.disableWeapon)
					{
						this.scene.ship.bullets.enabled = true;
					}

					this.clear();

					this.sequenceDone = true;
				}
			});
		}
	}

}

export default MinesGroup;
