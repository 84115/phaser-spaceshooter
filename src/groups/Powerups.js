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
			"game-life": {
				key: "heart",
				callback: () => {
					this.scene.ship.lives++;
					this.scene.ship.updateStat('lives');
				}
			},
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
				args: [0.05, 20000]
			},
			"ship-invincible": {
				key: "steel",
				callback: this.invincible,
				args: [20000]
			},

			"gun-pierce": {
				key: "skull",
				callback: this.firerate,
				args: [2, 20000, true]
			},
			"gun-poision": {
				key: "slime",
				callback: this.poison,
				args: [20000]
			},
			"gun-flame": {
				key: "flame",
				callback: this.poison,
				args: [20000]
			},
			"gun-ice": {
				key: "ice",
				callback: this.freeze,
				args: [20000]
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

		let powerup = this.triggers[key];

		if (powerup)
		{
			for (var i = 0; i < data.coords.length; i++)
			{
				let coord = data.coords[i];

				let sprite = this.scene.physics.add.sprite(
					this.scene.grid[coord.start.x],
					this.scene.grid[coord.start.y],
					powerup.key);

				sprite.lookup = key;

				if (powerup.tint)
				{
					sprite.setTint(powerup.tint);
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

				sprite.setAlpha(0);

				sprite.tween = this.scene.tweens.add({
					targets: sprite,
					alpha: { value: 1, duration: 750, ease: 'Power2' },
					scaleX: { value: 1.5, duration: 750, delay: 150, ease: 'Power1', yoyo: true, repeat: -1 },
					scaleY: { value: 1.5, duration: 750, delay: 150, ease: 'Power1', yoyo: true, repeat: -1 }
				});
			}

			this.createTimeline();
		}

		this.prop = this.scene.props.addFolder("Powerups");
		this.active = "";
		this.prop.add(this, 'active', Object.keys(this.triggers).concat([''])).onChange(lookup => this.handle(this.triggers[lookup], true));
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

	handle(powerup, force=false)
	{
		var powerupFn;

		if (force)
		{
			powerupFn = powerup;
		}
		else
		{
			powerupFn = this.triggers[powerup.lookup];
		}

		console.log(powerupFn);

		if (powerupFn)
		{
			powerupFn.callback.apply(this, powerupFn.args);
		}
	}

	firerate(amount=1, duration=0, pierce=false)
	{
		this.scene.ship.bullets.speed = this.scene.ship.bullets.speed / amount;
		this.scene.ship.updateStat('bulletspeed');

		this.scene.ship.bullets.pierce = true;

		this.scene.ship.setTint(0xff0000);
		this.scene.ship.bullets.tint = 0xff0000;

		if (duration)
		{
			this.scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					this.scene.ship.bullets.speed = this.scene.ship.bullets.speed * amount;
					this.scene.ship.updateStat('bulletspeed');

					this.scene.ship.bullets.pierce = true;

					this.scene.ship.setTint();
					this.scene.ship.bullets.tint = false;
				}
			});
		}
	}

	speed(amount=0, duration=0)
	{
		this.scene.ship.speed = Math.round((this.scene.ship.speed + amount) * 100) / 100;

		this.scene.ship.updateStat('speed');

		if (duration)
		{
			this.scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					this.scene.ship.speed = Math.round((this.scene.ship.speed - amount) * 100) / 100;

					this.scene.ship.updateStat('speed');
				}
			});
		}
	}

	health(amount=100)
	{
		this.scene.ship.maxHealth = this.scene.ship.maxHealth + amount;
		this.scene.ship.health = this.scene.ship.maxHealth;

		this.scene.ship.updateStat('health');
	}

	shield(amount=100)
	{
		this.scene.ship.maxShield = this.scene.ship.maxShield + amount;
		this.scene.ship.shield = this.scene.ship.maxShield;

		this.scene.ship.updateStat('shield');
	}

	poison(duration=100)
	{
		this.scene.ship.setTint(0xffff00);
		this.scene.ship.bullets.tint = 0xffff00;
		this.scene.ship.bullets.poisoned = true;

		if (duration)
		{
			this.scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					this.scene.ship.setTint();
					this.scene.ship.bullets.tint = false;
					this.scene.ship.bullets.poisoned = false;
				}
			});
		}
	}

	freeze(duration=100)
	{
		this.scene.ship.setTint(0x00ffff);
		this.scene.ship.bullets.tint = 0x00ffff;
		this.scene.ship.bullets.frozen = true;

		if (duration)
		{
			this.scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					this.scene.ship.setTint();
					this.scene.ship.bullets.tint = false;
					this.scene.ship.bullets.frozen = false;
				}
			});
		}
	}

	invincible(duration=100)
	{
		this.scene.ship.setTint(0xff00ff);
		this.scene.ship.invincible = true;

		if (duration)
		{
			this.scene.time.addEvent({
				delay: duration,
				callback: () =>
				{
					this.scene.ship.setTint();
					this.scene.ship.invincible = false;
				}
			});
		}
	}

}

export default PowerupsGroup;
