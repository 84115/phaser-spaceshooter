import Image from '../images/Image';

class BackgroundImage extends Image
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

}

export default BackgroundImage;
