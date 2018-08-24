import SequencableGroup from '../groups/Sequencable';

class PowerupsGroup extends SequencableGroup
{

	constructor(scene, tint, pattern='powerupOne', key)
	{
		super(scene);

		// Default args
		// amount :: default = no-change
		// time 0 :: 0=perma
		this.triggers = {
			// "game-life": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "game-multiplier": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "game-credit": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },

			"ship-health": {
				key: "orb-red",
				callback: this.health,
				args: [100]
			},
			"ship-shield": {
				key: "orb-blue",
				callback: this.shield,
				args: [100]
			},
			"ship-speed": {
				key: "orb-green",
				callback: this.speed,
				args: [0.05, 10000]
			},
			// "ship-invincible": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },

			"gun-pierce": {
				key: "skull",
				callback: this.firerate,
				args: [2, 10000, true]
			},
			"gun-poision": {
				key: "slime",
				callback: this.poison,
				args: [10000]
			},
			"gun-flame": {
				key: "flame",
				callback: this.poison,
				args: [10000]
			},
			"gun-ice": {
				key: "ice",
				callback: this.freeze,
				args: [10000]
			},
			// "gun-speed": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "gun-spread": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "gun-size": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "gun-explosive": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "gun-laser": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
			// "gun-bounce": {
			// 	key: "orb",
			// 	callback: () => (false)
			// },
		};

		let data = this.getSequence(pattern);

		for (var i = 0; i < data.coords.length; i++)
		{
			let coord = data.coords[i];

			let sprite = this.scene.physics.add.sprite(
				this.scene.grid[coord.start.x],
				this.scene.grid[coord.start.y],
				key);

			if (this.triggers[key].tint)
			{
				sprite.setTint(this.triggers[key].tint);
			}

			sprite.index = i;

			sprite.getParent = () => this;

			if (sprite.startWeaponTimer && weaponInterval)
			{
				sprite.startWeaponTimer(weaponInterval);
			}

			if (tint)
			{
				sprite.setTint(sprite.tintColor);
			}

			this.addSequence(sprite, coord);
		}

		this.createTimeline();
	}

	patch()
	{
		if (this.scene.ship)
		{
			this.scene.ship.collider(this, this.scene.ship.collideShipPowerUps);	
		}

		return this;
	}

	start(interval=5000, limit=3)
	{
		this.patch();

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

	firerate(scene, amount=1, duration=0, pierce=false)
	{
		scene.ship.bullets.speed = scene.ship.bullets.speed / amount;
		scene.ship.updateStat('bulletspeed');

		scene.ship.bullets.pierce = true;

		scene.ship.setTint(0xff0000);
		scene.ship.bullets.tint = 0xff0000;

		if (duration)
		{
			scene.time.addEvent({
				delay: duration,
				callback: () =>
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

	speed(scene, amount=0, duration=0)
	{
		scene.ship.speed = Math.round((scene.ship.speed + amount) * 100) / 100;

		scene.ship.updateStat('speed');

		if (duration)
		{
			scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
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

	poison(scene, duration=100)
	{
		scene.ship.setTint(0xffff00);
		scene.ship.bullets.tint = 0xffff00;
		scene.ship.bullets.poisoned = true;

		if (duration)
		{
			scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					scene.ship.setTint();
					scene.ship.bullets.tint = false;
					scene.ship.bullets.poisoned = false;
				}
			});
		}
	}

	freeze(scene, duration=100)
	{
		scene.ship.setTint(0x00ffff);
		scene.ship.bullets.tint = 0x00ffff;
		scene.ship.bullets.frozen = true;

		if (duration)
		{
			scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					scene.ship.setTint();
					scene.ship.bullets.tint = false;
					scene.ship.bullets.frozen = false;
				}
			});
		}
	}

}

export default PowerupsGroup;
