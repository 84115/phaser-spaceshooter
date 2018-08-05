import Group from '../groups/Group';

class PowerupsGroup extends Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		// Default args
		// amount :: default = no-change
		// time 0 :: 0=perma
		this.triggers = {
			"skull": {
				callback: this.firerate,
				args: [2, 5000, true]
			},
			// "orb": {
			// 	callback: this.health,
			// 	args: [100],
			// 	tint: 0xff00ff
			// },
			"orb-red": {
				callback: this.health,
				args: [100]
			},
			"orb-blue": {
				callback: this.shield,
				args: [100]
			},
			"orb-green": {
				callback: this.speed,
				args: [0.05, 5000]
			},
			"slime": {
				callback: this.poison,
				args: [5000]
			},
			"flame": {
				callback: this.poison,
				args: [5000]
			},
			"ice": {
				callback: this.freeze,
				args: [5000]
			},
		};
	}

	start(interval=5000, limit=3)
	{
		this.timer = this.scene.time.addEvent({
			delay: interval,
			callback: () =>
			{
				if (!this.timer.paused)
				{
					if (this.getChildren().length <= limit)
					{
						let randomKey = Phaser.Utils.Array.GetRandom(Object.keys(this.triggers));

						let randomSprite = this.scene.physics.add.sprite(
							this.scene.grid.randomX(true),
							this.scene.grid.randomY(true),
							randomKey
						);

						if (this.triggers[randomKey].tint)
						{
							randomSprite.setTint(this.triggers[randomKey].tint);
						}

						this.add(randomSprite);
					}
				}
			},
			loop: true
		});

		return this;
	}

	pause()
	{
		this.timer.paused = true;

		return this;
	}

	resume()
	{
		this.timer.paused = false;

		return this;
	}

	stop()
	{
		this.pause();
		this.clear();

		return this;
	}

	handle(powerup)
	{
		var powerupFn = this.triggers[powerup.texture.key];

		if (powerupFn)
		{
			powerupFn.callback.apply(null, [this.scene].concat(powerupFn.args));
		}
	}

	firerate(scene, amount=1, time=0, pierce=false)
	{
		scene.ship.bullets.speed = scene.ship.bullets.speed / amount;
		scene.ship.updateStat('bulletspeed');

		scene.ship.bullets.pierce = true;

		scene.ship.setTint(0xff0000);
		scene.ship.bullets.tint = 0xff0000;

		if (time)
		{
			scene.time.addEvent({
				delay: time,
				callback: function()
				{
					scene.ship.bullets.speed = scene.ship.bullets.speed * amount;
					scene.ship.updateStat('bulletspeed');

					scene.ship.bullets.pierce = true;

					scene.ship.setTint();
					scene.ship.bullets.tint = false;
				}
			});
		}
	}

	speed(scene, amount=0, time=0)
	{
		scene.ship.speed = Math.round((scene.ship.speed + amount) * 100) / 100;

		scene.ship.updateStat('speed');

		if (time)
		{
			scene.time.addEvent({
				delay: time,
				callback: function() {
					scene.ship.speed = Math.round((scene.ship.speed - amount) * 100) / 100;

					scene.ship.updateStat('speed');
				}
			});
		}
	}

	health(scene, amount=100)
	{
		scene.ship.maxHealth = scene.ship.maxHealth + amount;
		scene.ship.health = scene.ship.maxHealth;

		scene.ship.updateStat('health');
	}

	shield(scene, amount=100)
	{
		scene.ship.maxShield = scene.ship.maxShield + amount;
		scene.ship.shield = scene.ship.maxShield;

		scene.ship.updateStat('shield');
	}

	poison(scene, time=100)
	{
		scene.ship.setTint(0xffff00);
		scene.ship.bullets.tint = 0xffff00;
		scene.ship.bullets.poisoned = true;

		if (time)
		{
			scene.time.addEvent({
				delay: time,
				callback: function() {
					scene.ship.setTint();
					scene.ship.bullets.tint = false;
					scene.ship.bullets.poisoned = false;
				}
			});
		}
	}

	freeze(scene, time=100)
	{
		scene.ship.setTint(0x00ffff);
		scene.ship.bullets.tint = 0x00ffff;
		scene.ship.bullets.frozen = true;

		if (time)
		{
			scene.time.addEvent({
				delay: time,
				callback: function() {
					scene.ship.setTint();
					scene.ship.bullets.tint = false;
					scene.ship.bullets.frozen = false;
				}
			});
		}
	}

}

export default PowerupsGroup;
