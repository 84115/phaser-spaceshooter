import ShipSprite from '../sprites/Ship';
import BackgroundObject from '../objects/BackgroundObject';
import ControllerObject from '../objects/ControllerObject';

class GameScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'GameScene' });
	}

	create()
	{
		this.background = new BackgroundObject(this, 'sky');

		// createSfx(this);

		this.ship = new ShipSprite(this, 160, 320, 'ship');

		this.controller = ControllerObject(this);

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
	}

	update(time, delta)
	{
		this.ship.update(this.controller, time, delta);

		this.background.update(this);
	}

}

export default GameScene;
