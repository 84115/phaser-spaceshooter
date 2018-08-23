import SequencableGroup from '../groups/Sequencable';
import Spike from '../sprites/Spike';
import Bullet from '../sprites/Bullet';

class SpikeGroup extends SequencableGroup
{

	constructor(scene, tint, pattern='leftToRight', key='ufo', health=100, weaponInterval=5000)
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
				'mine',
				200);

			sprite.index = i;

			sprite.getParent = () => this;

			if (sprite.startWeaponTimer && weaponInterval)
			{
				sprite.startWeaponTimer(weaponInterval);
			}

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
