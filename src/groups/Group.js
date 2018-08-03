class Group extends Phaser.GameObjects.Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

	done()
	{
		if (this.children.entries.length === 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

}

export default Group;
