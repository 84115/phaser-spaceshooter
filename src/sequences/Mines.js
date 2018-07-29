function MinesSequence(scene, limit=100, interval=1000)
{
	var mines = (scene.mines
		? scene.mines
		: scene.physics.add.group());

	mines.prev = [];
	mines.count = 0;

	if (scene.background.scroll)
	{
		scene.background.scroll = scene.background.scroll * 12;
	}

	mines.timer = scene.time.addEvent({
		delay: interval,
		callback: () =>
		{
			var pos = scene.grid.randomX();

			for (var i = 0; i <= 11; i++)
			{
				if (mines.prev.includes(pos))
				{
					var pos = scene.grid.randomX();
				}
			}

			mines.prev.unshift(pos);
			mines.prev = mines.prev.slice(0, 11);

			mines.add(scene.physics.add.sprite(pos, scene.grid[0], 'mine').setCircle(16));

			mines.count++;

			if (mines.count >= limit)
			{
				mines.timer.remove(false);
				mines.prev = [];
				mines.count = 0;

				scene.time.addEvent({
					delay: 4000,
					callback: () =>
					{
						scene.background.scroll = scene.background.scrollBase;
					}
				});
			}
		},
		loop: true
	});

	return mines;
}

export default MinesSequence;
