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
					// Can't use apply :''''(
					// Need to manually add sequence.args[n]
					this.scene[sequence.key] = new sequence.class(
						this.scene, sequence.args[0], sequence.args[1]
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

					this.scene[sequence.key] = false;

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
}

export default Queue;
