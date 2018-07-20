import ShipSprite from '../sprites/Sprite';
import BackgroundImage from '../images/BackgroundImage';

class GameScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'GameScene' });
	}

	preload()
	{
	}

	create()
	{
		this.ship = new ShipSprite(this, 160, 320, 'ship');

		this.createBackground();
	}

	createBackground()
	{
		this.background = this.background || {};

		this.background.scrollBase = 0.5;
		this.background.scroll = this.background.scrollBase;

		this.background.a = new BackgroundImage(this, -80, 0, 'sky')
			.setOrigin(0.5, 0);

		this.background.b = new BackgroundImage(this, 400, -640, 'sky')
			.setOrigin(0.5, 0);

		return this;
	}

	update(time, delta)
	{
		if (this.background.a.y > 640) {
			this.background.a.x = Phaser.Math.Between(-80, 400);
			this.background.a.y = (-640);
		}
		else {
			this.background.a.y = this.background.a.y + this.background.scroll;
		}
		if (this.background.b.y > 640) {
			this.background.b.x = Phaser.Math.Between(-80, 400);
			this.background.b.y = (-640);
		}
		else {
			this.background.b.y = this.background.b.y + this.background.scroll;
		}
	}
}

export default GameScene;
