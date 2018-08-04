class Group extends Phaser.Physics.Arcade.Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

	done()
	{
		if (this.getChildren().length === 0)
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
