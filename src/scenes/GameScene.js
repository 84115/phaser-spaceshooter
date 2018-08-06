import Grid from '../util/Grid';
import Sfx from '../objects/Sfx';
import Background from '../objects/Background';
import Stats from '../util/Stats';
import Ship from '../sprites/Ship';
import Controller from '../objects/Controller';
import StageTitle from '../util/StageTitle';
import Animations from '../util/Animations';
import Queue from '../util/Queue';
import Powerups from '../groups/Powerups';
import Ufos from '../groups/Ufos';
import Mines from '../groups/Mines';
import Brain from '../sequences/Brain';
import DebugGrid from '../debug/Grid';

class GameScene extends Phaser.Scene
{

	constructor()
	{
		super({ key: 'GameScene' });
	}

	create()
	{
		this.background = new Background(this, 'sky');

		this.score = 0;
		this.gameover = false;

		this.stats = new Stats(this);
		this.stats.updateStat('score', this.score);

		this.grid = Grid(32);
		this.sfx = Sfx(this);

		this.ship = new Ship(this, this.grid.centerX, this.grid[19], 'ship');

		this.controller = Controller(this);

		this.StageTitle = StageTitle;
		this.StageTitle(this, "Level:1");

		this.animations = Animations(this);

		this.queue = new Queue(this);

		this.queue
			.add('ufos', Ufos, [null, 'rightToLeft', 'alien'])
			.add('mines', Mines, [null, 30, 200, true])
			.add('ufos', Ufos, [0x00ffff, 'leftToRight']) // light-blue
			.add('ufos', Ufos, [0xff00ff, 'rightToLeft']) // purple
			.add('ufos', Ufos, [0xffff00, 'leftToRight']) // green
			.add('mines', Mines, [null, 500, 50, false, 'asteroid'])
			.run();

		// this.brain = Brain(this, 10, 200);
		// this.physics.add.collider(this.ship.bullets, this.brain, (brain, bullet) =>
		// {
		// 	brain.alive = false;
		// 	brain.destroy();
		// 	bullet.destroy();
		// }, null, this.ship);

		this.powerups = new Powerups(this);
		this.powerups.start();
		this.ship.collider(this.powerups, this.ship.collideShipPowerUps);

		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}
	}

	update(time, delta)
	{
		if (!this.gameover)
		{
			this.ship.update(time, delta);

			this.queue.update(time, delta);
		}

		this.background.update(time, delta);
	}

	incrementScore(amount=0)
	{
		this.score = this.score + amount;

		this.stats.updateStat('score', this.score);

		return amount;
	}
}

export default GameScene;
