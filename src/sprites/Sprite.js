class Sprite extends Phaser.Physics.Arcade.Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.alive = true;

		this.scene = scene;

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

	damage(amount=0)
	{
		if (this.health && amount)
		{
			this.health = this.health - amount;
		}
	}

	collider(b, callback)
	{
		this.scene.physics.add.collider(this, b, callback, null, this);
	}

}

export default Sprite;
