import Image from '../images/Image';

class BackgroundObject
{

	constructor(scene, key)
	{
		this.scene = scene;

		this.scrollBase = 0.5;
		this.scroll = this.scrollBase;

		this.a = new Image(scene, -80, 0, key)
			.setOrigin(0.5, 0);

		this.b = new Image(scene, 400, -640, key)
			.setOrigin(0.5, 0);

			console.log(this.scene)

		this.prop = this.scene.props.addFolder("Background");
		this.prop.add(this, 'scroll');

		return this;
	}

	update(scene)
	{
		if (this.scene.background.a.y > 640) {
			this.scene.background.a.x = Phaser.Math.Between(-80, 400);
			this.scene.background.a.y = (-640);
		}
		else {
			this.scene.background.a.y = this.scene.background.a.y + this.scene.background.scroll;
		}

		if (this.scene.background.b.y > 640) {
			this.scene.background.b.x = Phaser.Math.Between(-80, 400);
			this.scene.background.b.y = (-640);
		}
		else {
			this.scene.background.b.y = this.scene.background.b.y + this.scene.background.scroll;
		}
	}

}

export default BackgroundObject;
