class Queue
{
	constructor(scene)
	{
		this.scene = scene;

		this.sequences = [];
		this.position = -1;
		this.timer = false;
		this.lock = false;
	}

	add(key, sequence, argsArray=[])
	{
		let args = [this.scene].concat(argsArray);

		if (sequence.patch)
		{
			sequence.patch();
		}

		this.sequences.push({
			"args": argsArray,
			"class": sequence,
			"key": key
		});

		return this;
	}

	run()
	{
		this.position = 0;

		this.timer = this.scene.time.addEvent({
			delay: 1000,
			callback: () =>
			{
				let sequence = this.sequences[this.position];

				if (!this.lock)
				{
					this.scene[sequence.key] = new sequence.class(
						this.scene, sequence.args[0], sequence.args[1]
					);

					// console.log(sequence.class.name.replace('Group', '').toLowerCase());
					// console.log(this.scene[sequence].constructor.name.replace('Group').toLowerCase());

					this.lock = true;
				}

				// if (this.scene[sequence.key].done())
				// {
				// 	this.lock = false;

				// 	this.position++;
				// }

				// if (this.count.position >= this.sequences.length)
				// {
				// 	this.timer.remove(false);
				// }
			},
			loop: true
		});
	}
}

export default Queue;
