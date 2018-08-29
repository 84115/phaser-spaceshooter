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

	update(time, delta)
	{
		if (this.getChildren())
		{
			for (var i = 0; i < this.getChildren().length; i++)
			{
				let child = this.getChildren()[i];

				if (child.update)
				{
					child.update(time, delta);
				}
			}
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
				let child = this.getChildren()[i];

				if (child)
				{
					this.scene.physics.add.collider(this.scene.ship, child, this.scene.ship.collideShipEnemy, null, this.scene.ship);

					if (this.scene.ship.bullets && child.shootable)
					{
						this.scene.physics.add.collider(this.scene.ship.bullets, child, this.scene.ship.collideBulletEnemyBullet, null, this.scene.ship);
					}
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
