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

		this.score = 0;
		this.gameover = false;

		this.stats = new Stats(this);
		this.stats.updateStat('score', this.score);

		this.grid = Grid(32);
		this.sfx = Sfx(this);

		this.ship = new Ship(this, this.grid.centerX, this.grid[19], 'ship');

		this.controller = Controller(this);

		this.StageTitle = StageTitle;
		this.StageTitle(this, "Level:0");

		this.createAnimations();

		this.createEnemies();

		this.createPowerups();

		this.createCollisions();

		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}
	}

	createPowerups()
	{
		this.powerUps = this.physics.add.group();

		this.powers = [
			this.physics.add.sprite(this.grid[4], this.grid[15], 'skull'),
			this.physics.add.sprite(this.grid.centerX, this.grid[15], 'skull'),
			this.physics.add.sprite(this.grid[8], this.grid[15], 'skull'),
			this.physics.add.sprite(this.grid[4], this.grid[13], 'orb-red'),
			this.physics.add.sprite(this.grid.centerX, this.grid[13], 'orb-green'),
			this.physics.add.sprite(this.grid[8], this.grid[13], 'orb-blue'),
		];

		for (var i = 0; i < this.powers.length; i++)
		{
			this.powerUps.add(this.powers[i]);
		}

	}

	createAnimations()
	{
	    this.anims.create(
	    {
	        key: 'explode-anim',
	        frames: this.anims.generateFrameNumbers('explode',
	        {
	        	start: 0,
	        	end: 11,
	        	first: 11
	        }),
	        frameRate: 10
	    });
	}

	createEnemies()
	{
		this.enemies = this.physics.add.group();

		this.enemies.add(this.physics.add.sprite(this.grid[3], this.grid[6], 'ufo'));
		this.enemies.add(this.physics.add.sprite(this.grid[6], this.grid[6], 'ufo'));
		this.enemies.add(this.physics.add.sprite(this.grid[9], this.grid[6], 'ufo'));
	}

	createCollisions()
	{
		this.physics.add.collider(
			this.ship.weapon.bullets,
			this.enemies.children.entries,
			this.ship.collideBulletEnemy,
			null,
			this.ship
		);

		this.physics.add.collider(
			this.ship,
			this.enemies.children.entries,
			this.ship.collideShipEnemy,
			null,
			this.ship
		);

		// this.physics.add.collider(
		// 	this.ship,
		// 	this.powerUps,
		// 	collideShipPowerUps,
		// 	null,
		// 	this
		// );
	}

	update(time, delta)
	{
		this.background.update();

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
