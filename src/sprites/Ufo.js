import EnemySprite from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class UfoSprite extends EnemySprite
{

	constructor(scene, x, y, key, health=100)
	{
		super(scene, x, y, key);

		this.projectile = this.scene.physics.add.group({
			classType: () => new Bullet(this.scene, 'bullet', 100, 250),
			maxSize: 10 * 1,
			runChildUpdate: true
		});
	}
}

export default UfoSprite;
