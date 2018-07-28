import Grid from '../util/Grid';
import Sfx from '../objects/Sfx';
import Background from '../objects/Background';
import Stats from '../util/Stats';
import Ship from '../sprites/Ship';
import Controller from '../objects/Controller';
import StageTitle from '../util/StageTitle';
import DebugGrid from '../debug/Grid';

class GameScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'GameScene' });
	}

	create()
	{
		this.background = new Background(this, 'sky');

		this.stats = new Stats(this);

		this.gameover = false;

		this.stats.updateStat('score', this.score = 0);

		this.grid = Grid(32);
		this.sfx = Sfx(this);

		this.ship = new Ship(this, this.grid.centerX, this.grid[19], 'ship');

		this.controller = Controller(this);

		this.StageTitle = StageTitle;
		StageTitle(this, "Level:0");

		// createEnemies(this);
		// createPowerups(this);
		// createPhysics(this);



		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}
	}

	update(time, delta)
	{
		this.background.update();

		if (!this.gameover)
		{
			this.ship.update(time, delta);
		}
	}

}

export default GameScene;
