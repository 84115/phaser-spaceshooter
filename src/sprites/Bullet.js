import Sprite from '../sprites/Sprite';

class Bullet extends Sprite
{

	constructor(scene, key='bullet', damage=100, speed=400, direction='down')
	{
		super(scene, 0, 0, key);

		this.damage = damage;
		this.speed = Phaser.Math.GetSpeed(speed, 1);
		this.direction = direction;
	}

	fire(x=0, y=0)
	{
		this.setPosition(x, y)
			.setActive(true)
			.setVisible(true);
	}

	isOffscreenX()
	{
		return this.x > 320 + 32 || this.x < -32;
	}

	isOffscreenY()
	{
		return this.y > 640 + 32 || this.y < -32;
	}

	isOffscreen()
	{
		return this.isOffscreenX() || this.isOffscreenY();
	}

	update(time, delta)
	{
		if (this.direction === 'up' || this.direction === 'upLeft' || this.direction === 'upRight')
		{
			this.y -= this.speed * delta;
		}
		else if (this.direction === 'down' || this.direction === 'downLeft' || this.direction === 'downRight')
		{
			this.y += this.speed * delta;
		}

		if (this.direction === 'left' || this.direction === 'upLeft' || this.direction === 'upRight')
		{
			this.x -= this.speed * delta;
		}
		else if (this.direction === 'right' || this.direction === 'downLeft' || this.direction === 'downRight')
		{
			this.x += this.speed * delta;
		}

		if (this.isOffscreen())
		{
			this.setActive(false)
				.setVisible(false);
		}
	}

}

export default Bullet;
