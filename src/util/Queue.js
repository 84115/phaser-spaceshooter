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

	add(key, sequence, args=[])
	{
		if (!((args) instanceof Array))
		{
			let args = [args];
		}

		this.sequences.push({
			"args": args,
			"class": sequence,
			"key": key
		});

		return this;
	}

	level(label=0)
	{
		this.message("Level:" + label);

		return this;
	}

	message(label="")
	{
		if (label)
		{
			this.add('title', this.scene.StageTitle, [label]);
		}

		return this;
	}

	previous()
	{
		let sequence = this.sequences[this.position];

		this.lock = false;

		this.scene[sequence.key] = false;

		this.position--;

		return this;
	}

	next()
	{
		let sequence = this.sequences[this.position];

		this.lock = false;

		this.scene[sequence.key] = false;

		this.position++;

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
				let args = sequence.args;

				if (!this.lock)
				{
					// Can't use apply :''''(
					// Need to manually add sequence.args[n]
					this.scene[sequence.key] = new sequence.class(
						this.scene, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]
					);

					if (this.scene[sequence.key].patch)
					{
						this.scene[sequence.key].patch();
					}

					this.lock = true;
				}

				if (this.scene[sequence.key].done())
				{
					this.lock = false;

					if (sequence.key !== 'title')
					{
						this.scene[sequence.key] = false;
					}

					this.position++;
				}

				if (this.position >= this.sequences.length)
				{
					this.timer.remove(false);

					if (this.scene.StageTitle)
					{
						this.scene.StageTitle(this.scene, "GameFin!");
					}
				}
			},
			loop: true
		});
	}

	update(time, delta)
	{
		let sequence = this.sequences[this.position];

		if (sequence)
		{
			if (sequence.key)
			{
				let key = this.scene[sequence.key];

				if (key)
				{
					if (key.update)
					{
						key.update(time, delta);
					}
				}
			}
		}
	}

}

export default Queue;
