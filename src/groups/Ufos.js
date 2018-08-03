import Group from '../groups/Group';
import Enemy from '../sprites/Enemy';

class UfoGroup extends Group
{

	constructor(scene)
	{
		super(scene);

		this.scene = scene;

		this.add(new Enemy(this.scene, this.scene.grid[3], this.scene.grid[6], 'ufo'));
		this.add(new Enemy(this.scene, this.scene.grid[6], this.scene.grid[6], 'ufo'));
		this.add(new Enemy(this.scene, this.scene.grid[9], this.scene.grid[6], 'ufo'));
	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship.bullets, this.children.entries, this.scene.ship.collideBulletEnemy, null, this.scene.ship);
		this.scene.physics.add.collider(this.scene.ship, this.children.entries, this.scene.ship.collideShipEnemy, null, this.scene.ship);
	}

}

export default UfoGroup;
