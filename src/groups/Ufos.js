import SequencableGroup from '../groups/Sequencable';
import Ufo from '../sprites/Ufo';

class UfoGroup extends SequencableGroup
{

	constructor(scene, opts={})
	{
		super(scene);

		this.set("key", opts.key, "mine");
		this.set("tint", opts.tint, null);
		this.set("pattern", opts.pattern, "leftToRight");
		this.set("health", opts.health, "100");
		this.set("limit", opts.limit, 100);
		this.set("interval", opts.interval, 1000);
		this.set("weaponInterval", opts.weaponInterval, 750);
		this.set("disableWeapon", opts.disableWeapon, false);
		this.set("angle", opts.angle, 0);
		this.set("direction", opts.direction, "down");

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
