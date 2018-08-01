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

	add(target=null, sequence, argsArray=[])
	{
		let args = [this.scene].concat(argsArray);

		if (sequence.patch)
		{
			sequence.patch();
		}

		this.sequences.push({
			"args": args,
			"class": sequence,
			"target": target
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
					console.log(sequence);
					// sequence.function = (new sequence.class(sequence.args));
					console.log(sequence.function);

					this.lock = true;
				}

				// Replace with .done
				if (sequence.function.done())
				{
					this.lock = false;

					this.position++;
				}

				if (this.count.position >= this.sequences.length)
				{
					this.timer.remove(false);
				}
			},
			loop: true
		});
	}
}

export default Queue;
