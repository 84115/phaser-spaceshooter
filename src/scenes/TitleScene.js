class TitleScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'TitleScene' });
	}

	preload()
	{
	}

	create()
	{
		this.scene.start('GameScene');
	}

	update()
	{
	}
}

export default TitleScene;
