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
			.add('mines', Ufos)
			.add('mines', Mines, [10, 200])
			.add('mines', Ufos)
			.add('mines', Mines, [10, 200])
			.run();


		// this.brain = Brain(this, 10, 200);
		// this.physics.add.collider(this.ship.bullets, this.brain, (brain, bullet) =>
		// {
		// 	brain.alive = false;
		// 	brain.destroy();
		// 	bullet.destroy();
		// }, null, this.ship);



		// this.powerups = new Powerups(this);
		// let _powers = [
		// 	this.physics.add.sprite(this.grid[4], this.grid[15], 'skull'),
		// 	this.physics.add.sprite(this.grid.centerX, this.grid[15], 'skull'),
		// 	this.physics.add.sprite(this.grid[8], this.grid[15], 'skull'),
		// 	this.physics.add.sprite(this.grid[4], this.grid[13], 'orb-red'),
		// 	this.physics.add.sprite(this.grid.centerX, this.grid[13], 'orb-green'),
		// 	this.physics.add.sprite(this.grid[8], this.grid[13], 'orb-blue'),
		// ];

		// for (var i = 0; i < _powers.length; i++)
		// {
		// 	this.powerups.add(_powers[i]);
		// }



		this.ship.collider(this.powerups, this.ship.collideShipPowerUps);



		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}
	}

	update(time, delta)
	{
		this.background.update(time, delta);

		if (!this.gameover)
		{
			this.queue.update(time, delta);

			this.ship.update(time, delta);
		}
	}

	incrementScore(amount=0)
	{
		this.score = this.score + amount;

		this.stats.updateStat('score', this.score);

		return amount;
	}
}

export default GameScene;
