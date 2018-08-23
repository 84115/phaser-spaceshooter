import SequencableGroup from '../groups/Sequencable';
import Spike from '../sprites/Spike';
import Bullet from '../sprites/Bullet';

class SpikeGroup extends SequencableGroup
{

	constructor(scene, tint, pattern='leftToRight', key='ufo', health=100, weaponInterval=750)
	{
		super(scene);

		let data = this.getSequence(pattern);

		for (var i = 0; i < data.coords.length; i++)
		{
			// data.coords[i].start
			let sprite = new Spike(
				this.scene,
				this.scene.grid[data.coords[i].start.x],
				this.scene.grid[data.coords[i].start.y],
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
				sprite.tint = tint;
				sprite.setTint(tint);
			}

			this.add(sprite);

			this.tweens.push({
				targets: this.getChildrenHead(),
				ease: data.coords[i].ease,
				duration: data.coords[i].duration,
				offset: (data.coords[i].duration * 0) + (data.coords[i].offset * (i + 1)),
				x: this.scene.grid[data.coords[i].stop.x],
				y: this.scene.grid[data.coords[i].stop.y],
			});
		}

		this.createTimeline();
	}

}

export default SpikeGroup;
