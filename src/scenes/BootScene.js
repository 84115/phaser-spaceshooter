class BootScene extends Phaser.Scene
{

	constructor()
	{
		super({ key: 'BootScene' });
	}

	preload()
	{
		this.load.image('ship', 'assets/sprites/shmup-ship.png');

		this.load.image('sky', 'assets/sprites/space.png');

		this.load.image('bullet', 'assets/sprites/bullet.png');
		this.load.image('bullet-2', 'assets/sprites/enemy-bullet.png');

		this.load.image('mine', 'assets/sprites/mine.png');
		this.load.image('ufo', 'assets/sprites/ufo.png');
		this.load.image('alien', 'assets/sprites/space-baddie.png');
		this.load.image('brain', 'assets/sprites/brain.png');

		this.load.image('steel', 'assets/sprites/steel-1.png');

		this.load.image('orb', 'assets/sprites/orb.png');
		this.load.image('orb-red', 'assets/sprites/orb-red.png');
		this.load.image('orb-green', 'assets/sprites/orb-green.png');
		this.load.image('orb-blue', 'assets/sprites/orb-blue.png');
		this.load.image('skull', 'assets/sprites/skull.png');
		this.load.image('slime', 'assets/sprites/slime-power.png');
		this.load.image('flame', 'assets/sprites/flame.png');
		this.load.image('ice', 'assets/sprites/diamond.png');

		this.load.image('font', 'assets/sprites/ulm.png');

		this.load.spritesheet('explode', 'assets/sprites/boom32wh12.png', {
			frameWidth: 32,
			frameHeight: 32,
			endFrame: 11
		});

		// TBA
		// this.load.image('asteroids', 'assets/sprites/asteroid_32x32x55.png');
		this.load.image('asteroid', 'assets/sprites/asteroid.png');

		this.load.audio('sfx', [
			'assets/audio/mixdown.ogg',
			'assets/audio/mixdown.mp3'
		]);
	}

	create()
	{
		this.scene.start('GameScene');
	}

}

export default BootScene;
