class Sprite extends Phaser.GameObjects.Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
	}

	damage(amount)
	{
		if (this.health && amount)
		{
			this.health = this.health - amount;
		}
	}

}

export default Sprite;
