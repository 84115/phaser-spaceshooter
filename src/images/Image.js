class Image extends Phaser.GameObjects.Image
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

}

export default Image;
