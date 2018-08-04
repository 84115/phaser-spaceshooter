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
				args: [2, 5000]
			},
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
		};
	}

	startGenerator(interval=7500, limit=4)
	{
		this.timer = this.scene.time.addEvent({
			delay: interval,
			callback: () =>
			{
				if (this.getChildren().length <= limit)
				{
					this.add(this.scene.physics.add.sprite(
						this.scene.grid.randomX(),
						this.scene.grid.randomX(),
						Phaser.Utils.Array.GetRandom(Object.keys(this.triggers))
					));
				}
			},
			loop: true
		});

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

	firerate(scene, amount=1, time=0)
	{
		scene.ship.bulletspeed = scene.ship.bulletspeed / amount;

		scene.ship.updateStat('bulletspeed');

		if (time)
		{
			scene.time.addEvent({
				delay: time,
				callback: function()
				{
					scene.ship.bulletspeed = scene.ship.bulletspeed * amount;

					scene.ship.updateStat('bulletspeed');
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

}

export default PowerupsGroup;
