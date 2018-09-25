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

	*[Symbol.iterator]()
	{
		if (this.getChildren())
		{
			for (let i = 0; i < this.getChildren().length; i++)
			{
				yield this.getChildren()[i];
			}
		}
	}

	update(time, delta)
	{
		for (let child of this)
		{
			if (child.update)
			{
				child.update(time, delta);
			}
		}
	}

	default(value=undefined, defaults=undefined)
	{
		if (value === undefined)
		{
			return defaults;
		}
		else
		{
			return this.config[value];
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

			for (let child of this)
			{
				this.scene.physics.add.collider(this.scene.ship, child, this.scene.ship.collideShipEnemy, null, this.scene.ship);

				if (this.scene.ship.bullets && child.shootable)
				{
					this.scene.physics.add.collider(this.scene.ship.bullets, child, this.scene.ship.collideBulletEnemyBullet, null, this.scene.ship);
				}

				if (child.projectile)
				{
					this.scene.physics.add.collider(this.scene.ship, child.projectile, this.scene.ship.collideShipEnemy, null, this.scene.ship);
				}
			}
		}

		return this;
	}

	done()
	{
		return this.getChildren().length === 0;
	}

	getChildrenHead()
	{
		return this.getChildren()[this.getChildren().length - 1];
	}

}

export default Group;
