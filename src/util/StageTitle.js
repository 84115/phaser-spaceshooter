function StageTitle(scene, message="Hello World")
{

	if (scene.title)
	{
		scene.title.destroy();
	}

	var fontConf = {
		image: 'font',
		width: 30,
		height: 19,
		chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
		align: 'center',
		charsPerRow: 10,
		spacing: { x: 2, y: 1 }
	};

	if (scene.cache)
	{
		scene.cache.bitmapFont.add('font', Phaser.GameObjects.RetroFont.Parse(scene, fontConf));

		scene.title = scene.add.bitmapText(
			scene.grid[3] - 6,
			scene.grid[0],
			'font',
			message.toUpperCase())
			.setCenterAlign()
			.setScale(1);

		scene.title.done = () => true;

		scene.tweens.add({
			targets: scene.title,
			x: scene.grid[3] - 6,
			y: scene.grid[5] - Math.ceil(fontConf.height / 2),
			duration: 1000,
			delay: 0,
			ease: 'Bounce'
		});

		scene.tweens.add({
			targets: scene.title,
			x: scene.grid[3] - 6,
			y: scene.grid[21],
			duration: 750,
			delay: 3000,
			ease: 'Linear'
		});

		return scene.title;
	}
	else
	{
		return false;
	}

}

export default StageTitle;
