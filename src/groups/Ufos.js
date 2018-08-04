import Group from '../groups/Group';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class UfoGroup extends Group
{

	constructor(scene)
	{
		super(scene);

		this.scene = scene;

		var tweenList = [];

		for (var i = 0; i <= 10; i++)
		{
			let ufo = new Enemy(this.scene, this.scene.grid[0], this.scene.grid[2 + i], 'ufo');

			ufo.projectile = this.scene.physics.add.group({
				classType: () => new Bullet(this.scene, 'bullet', 100, 250, true),
				maxSize: 10,
				runChildUpdate: true
			});

			ufo.timer = this.scene.time.addEvent({
				delay: 500,
				callback: () =>
				{
					ufo.bullet = ufo.projectile.get();

					if (ufo && ufo.bullet)
					{
						ufo.bullet.fire(ufo.x, ufo.y);
					}
				},
				loop: true
			});

			this.add(ufo);

			tweenList.push({
				targets: ufo,
				x: this.scene.grid[12],
				ease: 'Power1',
				duration: 2000,
				offset: 1000*(i+1)
			})
		}

		var timeline = this.scene.tweens.timeline({
			tweens: tweenList,
			onComplete: () => this.clear(true)
		});

	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);
		this.scene.physics.add.collider(this.scene.ship, this.getChildren(), this.scene.ship.collideShipEnemy, null, this.scene.ship);
	}

}

export default UfoGroup;
