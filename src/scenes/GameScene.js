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



		this.enemies = this.physics.add.group();
		// this.enemies.add(new Enemy(this, this.grid[3], this.grid[6], 'ufo'));
		// this.enemies.add(new Enemy(this, this.grid[6], this.grid[6], 'ufo'));
		// this.enemies.add(new Enemy(this, this.grid[9], this.grid[6], 'ufo'));



		this.mines = this.physics.add.group();
		// Mines(this, 10, 200);



		this.brain = this.physics.add.sprite(0, 0);
		Brain(this, 10, 200);



		this.powerups = new Powerups(this);



		this.createCollisions();



		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}
	}

	createCollisions()
	{
		this.physics.add.collider(this.ship.bullets, this.enemies.children.entries, this.ship.collideBulletEnemy, null, this.ship);
		this.physics.add.collider(this.ship.bullets, this.mines.children.entries, this.ship.collideBulletEnemy, null, this.ship);

		this.ship.collider(this.enemies.children.entries, this.ship.collideShipEnemy);
		this.ship.collider(this.mines.children.entries, this.ship.collideShipEnemy);

		this.ship.collider(this.powerups, this.ship.collideShipPowerUps);
	}

	update(time, delta)
	{
		this.background.update();

		for (var i = 0; i < this.mines.children.entries.length; i++)
		{
			let mine = this.mines.children.entries[i];

			mine.y = mine.y + 2 + Math.round(mine.y/150);

			if (mine.y >= 640 + 32)
			{
				mine
					.disableBody(true, true)
					.destroy();
			}
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
