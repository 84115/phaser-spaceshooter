import Sprite from '../sprites/Sprite';

class Beam extends Sprite
{

	constructor(scene, key='bullet', damage=100, speed=400, direction='down')
	{
		super(scene, 0, 0, key);

		this.damage = damage;
		this.speed = Phaser.Math.GetSpeed(speed, 1);
		this.direction = direction;
		this.shootable = true;
	}

	fire(x=0, y=0, direction)
	{
		if (direction)
		{
			this.direction = direction;
		}

		this.setPosition(x, y)
			.setActive(true)
			.setVisible(true);
	}

	update(time, delta)
	{
		this.followSpriteAngle(this.scene.ship);

		this.scene.physics.moveToObject(this, this.scene.ship);
	}

}

export default Beam;
