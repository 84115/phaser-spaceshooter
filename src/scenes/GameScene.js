import Grid from '../util/Grid';
import Sfx from '../objects/Sfx';
import Background from '../objects/Background';
import Stats from '../util/Stats';
import Ship from '../sprites/Ship';
import Controller from '../objects/Controller';
import StageTitle from '../util/StageTitle';
import Animations from '../util/Animations';
import LevelQueue from '../util/LevelQueue';
import DebugGrid from '../debug/Grid';
import Prop from '../util/Prop';

class GameScene extends Phaser.Scene
{

	constructor()
	{
		super({ key: 'GameScene' });
	}

	create()
	{
		this.props = new Prop(this);
		this.prop = this.props.addFolder("Scene");

		this.background = new Background(this, 'sky');

		this.score = 0;
		this.gameover = false;

		this.stats = new Stats(this);
		this.stats.updateStat('score', this.score);

		this.width = this.sys.game.config.width;
		this.height = this.sys.game.config.height;
		this.tile = this.width / 10;
		this.grid = Grid(this.width, this.height);

		this.ship = new Ship(this, this.grid[6], this.grid[19], 'ship');
		this.sfx = new Sfx(this);
		this.controller = new Controller(this);
		this.StageTitle = StageTitle;
		this.animations = new Animations(this);

		this.queue = new LevelQueue(this);
		this.queue.run();

		if (this.physics.config.debug)
		{
			this.debugGrid = DebugGrid(this);
		}

		this.prop.add(this, 'score').onChange(score => this.stats.updateStat('score', score));
		this.prop.add(this, 'gameover').onChange(score => score ? this.ship.kill() : this.ship.revive());
	}

	update(time, delta)
	{
		if (!this.gameover)
		{
			this.ship.update(time, delta);
		}

		this.queue.update(time, delta);

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
