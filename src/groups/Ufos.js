import SequencableGroup from '../groups/Sequencable';
import Enemy from '../sprites/Enemy';
import Bullet from '../sprites/Bullet';

class UfoGroup extends SequencableGroup
{

	constructor(scene, tint, pattern='leftToRight', key='ufo', health=100, weaponInterval=750)
	{
		super(scene);

		let data = this.getSequence(pattern);

		for (var i = 0; i < data.coords.length; i++)
		{
			let sprite = new Enemy(
				this.scene,
				data.coords[i].start.x,
				data.coords[i].start.y,
				key,
				health);

			sprite.index = i;

			sprite.getParent = () => this;

			sprite.projectile = this.scene.physics.add.group({
				classType: () => new Bullet(this.scene, 'bullet', 100, 250),
				maxSize: 10,
				runChildUpdate: true
			});

			if (weaponInterval)
			{
				sprite.timer = this.scene.time.addEvent({
					delay: weaponInterval,
					callback: sprite.fire,
					callbackScope: sprite,
					loop: true
				});
			}

			if (tint)
			{
				sprite.tint = tint;
				sprite.setTint(tint);
			}

			this.add(sprite);

			// this.addSequence(x, y, duration, ease, offset);
			this.tweens.push({
				targets: this.getChildrenHead(),
				ease: data.coords[i].ease,
				duration: data.coords[i].duration,
				offset: (data.coords[i].duration * 0) + (data.coords[i].offset * (i + 1)),
				x: this.scene.grid[data.coords[i].stop.x],
				y: this.scene.grid[data.coords[i].stop.y],
			});
		}

		this.createTimeline();
	}

	patch()
	{
		this.scene.physics.add.collider(this.scene.ship, this.getChildren(), this.scene.ship.collideShipEnemy, null, this.scene.ship);
		this.scene.physics.add.collider(this.scene.ship.bullets, this.getChildren(), this.scene.ship.collideBulletEnemy, null, this.scene.ship);

		for (var i = 0; i < this.getChildren().length; i++)
		{
			if (this.getChildren()[i].projectile)
			{
				this.scene.physics.add.collider(this.scene.ship, this.getChildren()[i].projectile, this.scene.ship.collideShipEnemy, null, this.scene.ship);
			}
		}
	}

}

export default UfoGroup;
