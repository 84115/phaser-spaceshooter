import Grid from '../util/Grid';
import Sfx from '../objects/Sfx';
import Background from '../objects/Background';
import Stats from '../util/Stats';
import Ship from '../sprites/Ship';
import Controller from '../objects/Controller';
import StageTitle from '../util/StageTitle';
import Animations from '../util/Animations';
import Powerups from '../groups/Powerups';
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

		this.animations = Animations(this);

		this.createEnemies();
		this.createMines();

		this.powerups = new Powerups(this);

		this.createCollisions();

		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}
	}

	createEnemies()
	{
		this.enemies = this.physics.add.group();
		this.enemies.add(this.physics.add.sprite(this.grid[3], this.grid[6], 'ufo'));
		this.enemies.add(this.physics.add.sprite(this.grid[6], this.grid[6], 'ufo'));
		this.enemies.add(this.physics.add.sprite(this.grid[9], this.grid[6], 'ufo'));
	}

	createMines()
	{
		this.mines = this.physics.add.group();
		this.mines.prev = [];
		this.mines.count = 0;

		if (this.background.scroll)
		{
			this.background.scroll = this.background.scroll * 16;
		}

		this.mines.timer = this.time.addEvent({
			delay: 200,
			callback: () =>
			{
				if (this.mines.count >= 100)
				{
					this.mines.timer.remove(false);
					this.background.scroll = this.background.scrollBase;
				}

				var pos = this.grid.randomX();

				for (var i = 0; i <= 11; i++)
				{
					if (this.mines.prev.includes(pos))
					{
						var pos = this.grid.randomX();
					}
				}

				this.mines.prev.unshift(pos);
				this.mines.prev = this.mines.prev.slice(0, 11);

				this.mines.add(this.physics.add.sprite(pos, this.grid[0], 'mine').setCircle(16));

				this.mines.count++;
			},
			loop: true
		});

		// this.mines.add(this.physics.add.sprite(this.grid[2], this.grid[2], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[3], this.grid[3], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[4], this.grid[4], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[5], this.grid[5], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[6], this.grid[4], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[7], this.grid[5], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[8], this.grid[4], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[9], this.grid[3], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[10], this.grid[2], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[5], this.grid[2], 'mine'));
		// this.mines.add(this.physics.add.sprite(this.grid[7], this.grid[2], 'mine'));
	}

	createCollisions()
	{
		this.physics.add.collider(this.ship.weapon.bullets, this.enemies.children.entries, this.ship.collideBulletEnemy, null, this.ship);
		this.physics.add.collider(this.ship.weapon.bullets, this.mines.children.entries, this.ship.collideBulletEnemy, null, this.ship);

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
