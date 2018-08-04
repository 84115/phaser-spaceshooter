import Sprite from '../sprites/Sprite';

class Bullet extends Sprite
{

	constructor(scene, damage=100, speed=400, reverse=false)
	{
		super(scene, 0, 0, 'bullet');

		this.scene = scene;

		if (reverse) {
			speed = -speed;
		}

		this.damage = damage;
		this.speed = Phaser.Math.GetSpeed(speed, 1);
		this.reverse = reverse;
	}

	fire(x=0, y=0)
	{
		this.setPosition(x, y)
			.setActive(true)
			.setVisible(true);
	}

	update(time, delta)
	{
		var cond = this.reverse
			? this.y > 640 + 50
			: this.y < -50;

		this.y -= this.speed * delta;

		if (cond)
		{
			this.setActive(false)
				.setVisible(false);
		}
	}

}

export default Bullet;
