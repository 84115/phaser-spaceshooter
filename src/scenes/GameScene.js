import Grid from '../util/Grid';
import Sfx from '../objects/Sfx';
import Background from '../objects/Background';
import Stats from '../util/Stats';
import Ship from '../sprites/Ship';
import Enemy from '../sprites/Enemy';
import Controller from '../objects/Controller';
import StageTitle from '../util/StageTitle';
import Animations from '../util/Animations';
import Powerups from '../groups/Powerups';
import Mines from '../sequences/Mines';
import Brain from '../sequences/Brain';
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



		// this.enemies = this.physics.add.group();
		// this.enemies.add(new Enemy(this, this.grid[3], this.grid[6], 'ufo'));
		// this.enemies.add(new Enemy(this, this.grid[6], this.grid[6], 'ufo'));
		// this.enemies.add(new Enemy(this, this.grid[9], this.grid[6], 'ufo'));
		// this.physics.add.collider(this.ship.bullets, this.enemies.children.entries, this.ship.collideBulletEnemy, null, this.ship);
		// this.ship.collider(this.enemies.children.entries, this.ship.collideShipEnemy);



		this.mines = new Mines(this, 10, 200);
		this.mines.patch();



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
		this.background.update();

		if (this.mines)
		{
			this.mines.update();
		}

		if (!this.gameover)
		{
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
