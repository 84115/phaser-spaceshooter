import Image from '../images/Image';

class BackgroundObject
{
	constructor(scene, key)
	{
		this.scrollBase = 0.5;
		this.scroll = this.scrollBase;

		this.a = new Image(scene, -80, 0, key)
			.setOrigin(0.5, 0);

		this.b = new Image(scene, 400, -640, key)
			.setOrigin(0.5, 0);

		return this;
	}

	update(scene)
	{
		if (scene.background.a.y > 640) {
			scene.background.a.x = Phaser.Math.Between(-80, 400);
			scene.background.a.y = (-640);
		}
		else {
			scene.background.a.y = scene.background.a.y + scene.background.scroll;
		}

		if (scene.background.b.y > 640) {
			scene.background.b.x = Phaser.Math.Between(-80, 400);
			scene.background.b.y = (-640);
		}
		else {
			scene.background.b.y = scene.background.b.y + scene.background.scroll;
		}
	}
}

export default BackgroundObject;
