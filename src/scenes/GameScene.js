import ShipSprite from '../sprites/Ship';
import BackgroundImage from '../images/BackgroundImage';

class GameScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'GameScene' });
	}

	create()
	{
		this.createBackground();

		// createSfx(this);
		// createShip(this);
		// createInput(this);
		// createStatus(this);
		// createEnemies(this);
		// createLevelTitle(this, "Level:0");
		// createPowerups(this);
		// createPhysics(this);

		// if (debug)
		// {
		// 	createDebugInput(this);
		// 	createDebugGrid(this);
		// }

		this.controller = {};
		this.controller.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.controller.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.controller.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.controller.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		this.ship = new ShipSprite(this, 160, 320, 'ship');
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
		this.ship.update(this.controller, time, delta);

		this.updateBackground(time, delta);
	}

	updateBackground()
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
