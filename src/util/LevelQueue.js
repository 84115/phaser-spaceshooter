import Queue from '../util/Queue';
import Powerups from '../groups/Powerups';
import Ufos from '../groups/Ufos';
import Mines from '../groups/Mines';
import Spikes from '../groups/Spikes';

class LevelQueue extends Queue
{

	constructor(scene)
	{
		super(scene);
	}

	levelDemo()
	{
		return this


			.level(0)
			.add('powerups', Powerups, [null, 'powerupStatic', 'gun-size'])
			.add('powerups', Powerups, [null, 'powerupStatic', 'game-life'])
			.add('powerups', Powerups, [null, 'powerupStatic', 'ship-invincible'])
			.add('ufos', Ufos, [null, 'artillery', 'alien', 50, 1000, 45, 'right'])

			.add('ufos', Ufos, [null, 'artillery', 'alien', 50, 1000, 45, 'right'])
			// .add('ufos', Ufos, [null, 'artilleryAlt', 'alien', 50, 0])

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
	}

	run()
	{
		this.levelDemo();

		super.run();
	}

}

export default LevelQueue;
