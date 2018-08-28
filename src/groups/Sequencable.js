import Group from '../groups/Group';
import sequenceTemplates from '../data/sequenceTemplates'

class SequencableGroup extends Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.tweens = [];
		this.timeline = undefined;
		this.sequenceTemplates = sequenceTemplates;
	}

	fillData(data)
	{
		for (var i = 0; i < data.coords.length; i++)
		{
			if (!('ease' in data.coords[i] && typeof data.coords[i].duration == 'string'))
			{
				data.coords[i].ease = data.ease ? data.ease : 'Power1';
			}

			if (!('duration' in data.coords[i] && typeof data.coords[i].duration == 'number'))
			{
				data.coords[i].duration = data.duration ? data.duration : 5000;
			}

			if (!('offset' in data.coords[i] && typeof data.coords[i].offset == 'number'))
			{
				data.coords[i].offset = data.offset ? data.offset : 1000;
			}
		}

		return data;
	}

	createTimeline()
	{
		this.timeline = this.scene.tweens.timeline({
			tweens: this.tweens,
			onComplete: this.cleanupChildren,
			callbackScope: this
		});
	}

	cleanupChildren()
	{
		for (var i = this.getChildren().length - 1; i >= 0; i--)
		{
			let child = this.getChildren()[i];

			if (child.timer)
			{
				child.timer.reset(false);
			}

			if (this.getChildren()[i].kill)
			{
				this.getChildren()[i].kill();
			}
			else
			{
				// if (child.disableBody)
				// {
				// 	child.disableBody(true, true);
				// }

				// if (child.destroy)
				// {
				// 	child.destroy();
				// }
			}
		}

		this.clear(true);
	}

	trySequenceTemplate(sequence)
	{
		if (typeof sequence === "string")
		{
			return this.sequenceTemplates[sequence];
		}
		else
		{
			return sequence;
		}
	}

	getSequence(sequence)
	{
		return this.fillData(this.trySequenceTemplate(sequence));
	}

	addSequence(sprite, coord)
	{
		this.add(sprite);

		this.tweens.push({
			targets: this.getChildrenHead(),
			ease: coord.ease,
			duration: coord.duration,
			offset: (coord.duration * 0) + (coord.offset * (sprite.index + 1)),
			x: this.scene.grid[coord.stop.x],
			y: this.scene.grid[coord.stop.y],
		});
	}

}

export default SequencableGroup;
