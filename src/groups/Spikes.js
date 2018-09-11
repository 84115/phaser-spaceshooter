import SequencableGroup from '../groups/Sequencable';
import Spike from '../sprites/Spike';

class SpikeGroup extends SequencableGroup
{

	constructor(scene, tint, pattern='leftToRight', key='mine', health=200, weaponInterval=5000, angle=0)
	{
		super(scene);

		let data = this.getSequence(pattern);

		for (var i = 0; i < data.coords.length; i++)
		{
			let coord = data.coords[i];

			let sprite = new Spike(
				this.scene,
				this.scene.grid[coord.start.x],
				this.scene.grid[coord.start.y],
				key,
				health);

			sprite.index = i;

			sprite.getParent = () => this;

			sprite.hookAngle(angle);
			sprite.hookWeaponTimer(weaponInterval);

			if (tint)
			{
				sprite.setTint(tint);
			}

			this.addSequence(sprite, coord);
		}

		this.createTimeline();
	}

}

export default SpikeGroup;
