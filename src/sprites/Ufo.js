import EnemySprite from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';
import Beam from '../sprites/Beam';

class UfoSprite extends EnemySprite
{

	constructor(scene, x, y, key, health=100)
	{
		super(scene, x, y, key);

		this.projectile = this.scene.physics.add.group({
			// classType: () => new Bullet(this.scene, 'bullet', 100, 250),
			classType: () => new Beam(this.scene),
			maxSize: 10 * 1,
			runChildUpdate: true
		});
	}

	update(time, delta)
	{
		this.followSpriteAngle(this.scene.ship);
	}
}

export default UfoSprite;
