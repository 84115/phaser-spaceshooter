import Bullet from '../sprites/Bullet';

class ShipBullet extends Bullet
{

	fire(x=0, y=0)
	{
		if (this.scene.ship.bullets.tint)
		{
			this.setTint(this.scene.ship.bullets.tint);
		}
		else
		{
			this.setTint();
		}

		this.setPosition(x, y)
			.setActive(true)
			.setVisible(true);
	}

}

export default ShipBullet;
