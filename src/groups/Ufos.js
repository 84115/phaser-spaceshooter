import SequencableGroup from '../groups/Sequencable';
import Ufo from '../sprites/Ufo';

class UfoGroup extends SequencableGroup
{

	constructor(scene, opts={})
	{
		super(scene);

		this.key = this.default(opts.key, "mine");
		this.tint = this.default(opts.tint, null);
		this.pattern = this.default(opts.pattern, "leftToRight");
		this.health = this.default(opts.health, "100");
		this.limit = this.default(opts.limit, 100);
		this.interval = this.default(opts.interval, 1000);
		this.weaponInterval = this.default(opts.weaponInterval, 750);
		this.disableWeapon = this.default(opts.disableWeapon, false);
		this.angle = this.default(opts.angle, 0);
		this.direction = this.default(opts.direction, "down");

		let data = this.getSequence(this.pattern);

		for (var i = 0; i < data.coords.length; i++)
		{
			let coord = data.coords[i];

			let sprite = new Ufo(
				this.scene,
				this.scene.grid[coord.start.x],
				this.scene.grid[coord.start.y],
				this.key,
				this.health,
				this.direction);

			sprite.index = i;

			sprite.getParent = () => this;

			sprite.hookAngle(this.angle);
			sprite.hookWeaponTimer(this.weaponInterval);

			if (this.tint)
			{
				sprite.setTint(this.tint);
			}

			this.addSequence(sprite, coord);
		}

		this.createTimeline();
	}

}

export default UfoGroup;
