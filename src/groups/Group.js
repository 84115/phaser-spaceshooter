class Group extends Phaser.GameObjects.Group
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.scene = scene;

		if (this.scene)
		{
			this.scene.physics.world.enable(this);
			this.scene.add.existing(this);
		}
	}

	patch()
	{
		return this;
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

	getChildrenHead()
	{
		return this.getChildren()[this.getChildren().length - 1];
	}

}

export default Group;
