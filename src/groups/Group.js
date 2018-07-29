class Group extends Phaser.GameObjects.Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

}

export default Group;
