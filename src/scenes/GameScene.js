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
import Spikes from '../groups/Spikes';
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

		this.width = this.sys.game.config.width;
		this.height = this.sys.game.config.height;
		this.tile = this.width / 10;
		this.grid = Grid(this.width, this.height);

		this.ship = new Ship(this, this.grid[6], this.grid[19], 'ship');
		this.sfx = new Sfx(this);
		this.controller = new Controller(this);
		this.StageTitle = StageTitle;
		this.animations = new Animations(this);

		this.queue = new Queue(this);

		this.queue

			.add('ufos', Ufos, [null, 'artillery', 'alien', 50, 0])

			.level(1)
			.add('powerups', Powerups, [null, 'powerupOne', 'ship-health'])
			.add('ufos', Ufos, [null, 'wallBottomLeftToTopRight', 'alien', 50, 0])
			.add('ufos', Ufos, [null, 'diagTopLeftToBottomRight', 'alien', 50, 0])

			.level(2)
			.add('powerups', Powerups, [null, 'powerupOne', 'ship-speed'])
			.add('spikes', Spikes, [0xff00ff, 'randSpikes'])

			.level(3)
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-poision'])
			.add('ufos', Ufos, [null, 'strikeTopBottomSnake', 'alien', 50, 0])
			.add('powerups', Powerups, [null, 'powerupOne', 'ice'])
			.add('ufos', Ufos, [null, 'fallGapsOne', 'alien', 50, 0])
			.add('powerups', Powerups, [null, 'powerupOne', 'ice'])
			.add('ufos', Ufos, [null, 'fallGapsTwo', 'alien', 50, 0])

			.level(4)
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-ice'])
			.add('ufos', Ufos, [null, 'fallDiagLeftToRight', 'alien', 50, 0])
			.add('ufos', Ufos, [null, 'fallDiagRightToLeft', 'alien', 50, 0])

			.level(5)
			.add('powerups', Powerups, [null, 'powerupOne', 'ship-health'])
			.add('ufos', Ufos, [null, 'crossroad'])
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-fire'])
			.add('ufos', Ufos, [0x00ffff, 'leftToRight']) // light-blue
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-fire'])
			.add('ufos', Ufos, [0xff00ff, 'rightToLeft']) // purple
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-fire'])
			.add('ufos', Ufos, [0xffff00, 'leftToRight']) // green

			.level(6)
			.add('powerups', Powerups, [null, 'powerupOne', 'ship-health'])
			.add('mines', Mines, [null, 30, 200, true])

			.level(7)
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-ice'])
			.add('ufos', Ufos, [0xff00ff, 'glue', 'ship', 50, 0, 180])

			.level(8)
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-pierce'])
			.add('mines', Mines, [null, 500, 50, false, 'asteroid'])

			.run();

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
	}

	incrementScore(amount=0)
	{
		this.score = this.score + amount;

		this.stats.updateStat('score', this.score);

		return amount;
	}
}

export default GameScene;
