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

			.add('ufos', Ufos,
			[{
				pattern: 'artillery',
				key: 'alien',
				health: 50,
				weaponInterval: 1000,
				angle: 45,
				direction: 'right'
			}])

			.add('ufos', Ufos,
			[{
				pattern: 'artillery',
				key: 'alien',
				health: 50,
				weaponInterval: 1000,
				angle: 45,
				direction: 'right'
			}])

			.add('ufos', Ufos,
			[{
				pattern: 'artilleryAlt',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])



			.level(1)

			.add('powerups', Powerups, [null, 'powerupOne', 'ship-health'])

			.add('ufos', Ufos,
			[{
				tint: null,
				pattern: 'wallBottomLeftToTopRight',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])

			.add('ufos', Ufos,
			[{
				tint: null,
				pattern: 'diagTopLeftToBottomRight',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])



			.level(2)

			.add('powerups', Powerups, [null, 'powerupOne', 'ship-speed'])
			.add('spikes', Spikes, [0xff00ff, 'randSpikes'])



			.level(3)

			.add('powerups', Powerups, [null, 'powerupOne', 'gun-poision'])

			.add('ufos', Ufos,
			[{
				pattern: 'strikeTopBottomSnake',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])

			.add('powerups', Powerups, [null, 'powerupOne', 'ice'])

			.add('ufos', Ufos,
			[{
				pattern: 'fallGapsOne',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])

			.add('powerups', Powerups, [null, 'powerupOne', 'ice'])

			.add('ufos', Ufos,
			[{
				pattern: 'fallGapsTwo',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])



			.level(4)

			.add('powerups', Powerups, [null, 'powerupOne', 'gun-ice'])

			.add('ufos', Ufos,
			[{
				pattern: 'fallDiagLeftToRight',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])

			.add('ufos', Ufos,
			[{
				pattern: 'fallDiagRightToLeft',
				key: 'alien',
				health: 50,
				weaponInterval: 0
			}])




			.level(5)

			.add('powerups', Powerups, [null, 'powerupOne', 'ship-health'])

			.add('ufos', Ufos,
			[{
				pattern: 'crossroad'
			}])

			.add('powerups', Powerups, [null, 'powerupOne', 'gun-fire'])

			.add('ufos', Ufos,
			[{
				tint: 0x00ffff,
				pattern: 'leftToRight'
			}]) // light-blue

			.add('powerups', Powerups, [null, 'powerupOne', 'gun-fire'])

			.add('ufos', Ufos,
			[{
				tint: 0xff00ff,
				pattern: 'rightToLeft'
			}]) // purple

			.add('powerups', Powerups, [null, 'powerupOne', 'gun-fire'])

			.add('ufos', Ufos,
			[{
				tint: 0xffff00,
				pattern: 'leftToRight'
			}]) // green



			.level(6)
			.add('powerups', Powerups, [null, 'powerupOne', 'ship-health'])
			.add('mines', Mines,
			[{
				limit: 30,
				interval: 200,
				disableWeapon: true
			}])

			.level(7)
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-ice'])
			.add('ufos', Ufos,
			[{
				tint: 0xff00ff,
				pattern: 'glue',
				key: 'ship',
				health: 50,
				weaponInterval: 0,
				angle: 180
			}])

			.level(8)
			.add('powerups', Powerups, [null, 'powerupOne', 'gun-pierce'])
			.add('mines', Mines,
			[{
				limit: 500,
				interval: 50,
				disableWeapon: false,
				key: 'asteroid'
			}])
	}

	run()
	{
		this.levelDemo();

		super.run();
	}

}

export default LevelQueue;
