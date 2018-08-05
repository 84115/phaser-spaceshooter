class Sprite extends Phaser.GameObjects.Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.scene = scene;

		this.alive = true;

		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
	}

	damage(amount=0)
	{
		if (this.health && amount)
		{
			this.health = this.health - amount;
		}
	}

	kill()
	{
		if (this.disableBody)
		{
			this.disableBody(true, true);
		}

		this.destroy();
	}

	collider(b, callback)
	{
		this.scene.physics.add.collider(this, b, callback, null, this);
	}

	wiggleEase(progress=0)
	{
		var distance = 10;
		var current1 = progress * Math.PI * 2 * distance;
		var current2 = progress * (Math.PI * 2 * distance + Math.PI / 2);

		return Math.sin(current1) * Math.cos(current2);
	}

}

export default Sprite;
