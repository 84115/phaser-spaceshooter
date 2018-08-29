import SequencableGroup from '../groups/Sequencable';
import Ufo from '../sprites/Ufo';

class UfoGroup extends SequencableGroup
{

	constructor(scene, tint, pattern='leftToRight', key='ufo', health=100, weaponInterval=750, angle=0)
	{
		super(scene);

		let data = this.getSequence(pattern);

		for (var i = 0; i < data.coords.length; i++)
		{
			let coord = data.coords[i];

			let sprite = new Ufo(
				this.scene,
				this.scene.grid[coord.start.x],
				this.scene.grid[coord.start.y],
				key,
				health);

			sprite.index = i;

			sprite.getParent = () => this;

			if (angle)
			{
				sprite.angle = angle;
			}

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

export default UfoGroup;
