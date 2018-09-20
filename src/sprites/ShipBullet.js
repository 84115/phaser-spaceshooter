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

		if (this.scene.ship.bullets.scale)
		{
			this.setScale(this.scene.ship.bullets.scale);
		}

		super.fire(x, y);
	}

}

export default ShipBullet;
