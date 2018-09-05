class Sprite extends Phaser.GameObjects.Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.scene = scene;

		this.alive = true;

		if (this.scene)
		{
			this.scene.physics.world.enable(this);
			this.scene.add.existing(this);
		}
	}

	damage(amount=0)
	{
		if (this.health && amount)
		{
			this.health = this.health - amount;
		}
	}

	explode()
	{
		if (this.scene)
		{
			this.scene.add
				.sprite(this.x, this.y, 'explode')
				.anims.play('explode-anim');
		}

		return this;
	}

	kill()
	{
		if (this.disableBody)
		{
			this.disableBody(true, true);
		}

		if (this.timer)
		{
			this.timer.reset(false);
		}

		if (this.destroy)
		{
			this.destroy();
		}
	}

	setTint(tint)
	{
		this.tintColor = tint;

		if (tint instanceof Array)
		{
			super.setTint.apply(tint);
		}
		else {
			super.setTint(tint);
		}
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

	followSpriteAngle(target)
	{
		let adjustment = 90;

		if (target)
		{
			this.rotation = Math.atan2(target.y - this.y, target.x - this.x) + adjustment;
		}
	}

}

export default Sprite;
