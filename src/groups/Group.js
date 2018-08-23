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
		if (this.scene.ship)
		{
			this.scene.physics.add.collider(this.scene.ship, this.getChildren(), this.scene.ship.collideShipEnemy, null, this.scene.ship);

			if (this.scene.ship.bullets)
			{
				this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);
			}

			for (var i = 0; i < this.getChildren().length; i++)
			{
				if (this.getChildren()[i].projectile)
				{
					this.scene.physics.add.collider(this.scene.ship, this.getChildren()[i].projectile, this.scene.ship.collideShipEnemy, null, this.scene.ship);
				}
			}
		}

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
