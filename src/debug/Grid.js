function DebugGrid(scene)
{
	var debugGrid = scene.add
		.graphics()
		.lineStyle(1, 0x2ECC40);

	for (var i = 1; i < scene.grid.length; i++)
	{
		debugGrid.moveTo(0, scene.grid[i])
			.lineTo(scene.width, scene.grid[i])
			.closePath()
			.strokePath();

		if (i < 12)
		{
			debugGrid.moveTo(scene.grid[i], 0)
				.lineTo(scene.grid[i], scene.height)
				.closePath()
				.strokePath();
		}

		if (i !== 20)
		{
			scene.add.text(scene.width-(scene.tile+(i < 10 ? 9 : 14)), scene.grid[i]-11, i)
				.setFontFamily("courier")
				.setFontSize(16)
				.setColor('black')
				.setAlign('center')
				.setStroke('green', 8);
		}

		if (i < 12 && i !== 10)
		{
			scene.add.text(scene.grid[i]-8, scene.height-(scene.tile+11), i)
				.setFontFamily("courier")
				.setFontSize(16)
				.setColor('black')
				.setAlign('center')
				.setStroke('green', 8);
		}

	}

	return debugGrid;
}

export default DebugGrid;
