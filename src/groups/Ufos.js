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

		// NEEDS TO USE THE GROUP
		for (var i = 0; i <= 10; i++)
		{
			let sprite = this.scene.physics.add.sprite(this.scene.grid[0], this.scene.grid[2+i], 'ufo')

			sprite.projectile = this.scene.physics.add.group({
				classType: () => new Bullet(this.scene, 'bullet', 100, 250, true),
				maxSize: 10,
				runChildUpdate: true
			});

			sprite.timer = this.scene.time.addEvent({
				delay: 500,
				callback: () =>
				{
					sprite.bullet = sprite.projectile.get();

					if (sprite && sprite.bullet)
					{
						sprite.bullet.fire(sprite.x, sprite.y);
					}
				},
				loop: true
			});

			this.add(sprite);

			let xxx = this.getChildren()[this.getChildren().length-1];

			tweenList.push({
				targets: xxx,
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
