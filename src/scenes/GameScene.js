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

		this.animations = Animations(this);

		this.queue = new Queue(this);

		this.queue

			// .add('ufos', Ufos, [null, 'static', 'steel', 50, 0])

			.level(1)
			.add('ufos', Ufos, [null, 'wallBottomLeftToTopRight', 'alien', 50, 0])
			.add('ufos', Ufos, [null, 'diagTopLeftToBottomRight', 'alien', 50])
			.add('ufos', Ufos, [null, 'crossroad', 'alien', 50])

			.level(2)
			.add('ufos', Ufos, [0x00ffff, 'leftToRight']) // light-blue
			.add('ufos', Ufos, [0xff00ff, 'rightToLeft']) // purple
			.add('ufos', Ufos, [0xffff00, 'leftToRight']) // green

			.level(3)
			.add('mines', Mines, [null, 30, 200, true])
			.add('mines', Mines, [null, 500, 50, false, 'asteroid'])

			.run();

		window.queue = this.queue;

		// this.brain = Brain(this, 10, 200);
		// this.physics.add.collider(this.ship.bullets, this.brain, (brain, bullet) =>
		// {
		// 	brain.alive = false;
		// 	brain.destroy();
		// 	bullet.destroy();
		// }, null, this.ship);

		this.powerups = new Powerups(this);
		this.powerups.start();

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
		}

		this.queue.update(time, delta);

		this.background.update(time, delta);

		// if (this.ufos) console.log('ufos', this.ufos.getChildren().length);
		// if (this.mines) console.log('mines', this.mines.getChildren().length);
	}

	incrementScore(amount=0)
	{
		this.score = this.score + amount;

		this.stats.updateStat('score', this.score);

		return amount;
	}
}

export default GameScene;
