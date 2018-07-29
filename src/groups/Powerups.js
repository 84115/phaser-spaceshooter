import Group from '../groups/Group';

class PowerupsGroup extends Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.scene = scene;

		this.powers = [
			this.scene.physics.add.sprite(this.scene.grid[4], this.scene.grid[15], 'skull'),
			this.scene.physics.add.sprite(this.scene.grid.centerX, this.scene.grid[15], 'skull'),
			this.scene.physics.add.sprite(this.scene.grid[8], this.scene.grid[15], 'skull'),
			this.scene.physics.add.sprite(this.scene.grid[4], this.scene.grid[13], 'orb-red'),
			this.scene.physics.add.sprite(this.scene.grid.centerX, this.scene.grid[13], 'orb-green'),
			this.scene.physics.add.sprite(this.scene.grid[8], this.scene.grid[13], 'orb-blue'),
		];

		for (var i = 0; i < this.powers.length; i++)
		{
			this.add(this.powers[i]);
		}
	}

	handle(powerup)
	{
		// Default args
		// amount :: default = no-change
		// time 0 :: 0=perma
		var powerupTriggers = {
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

		var powerupFn = powerupTriggers[powerup.texture.key];

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
