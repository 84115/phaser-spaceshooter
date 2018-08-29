class BootScene extends Phaser.Scene
{

	constructor()
	{
		super({ key: 'BootScene' });
	}

	preload()
	{
		this.progress = this.add.graphics();

		this
			.preloadImages()
			.preloadFonts()
			.preloadSpritesheets()
			.preloadAudio();

		this.load.on('progress', this.onProgress, this);

		this.load.on('complete', this.onComplete, this);
	}

	preloadImages()
	{
		// Player
		this.load.image('ship', 'assets/sprites/shmup-ship.png');

		// Background
		this.load.image('sky', 'assets/sprites/space.png');

		// Enemies
		this.load.image('mine', 'assets/sprites/mine.png');
		this.load.image('ufo', 'assets/sprites/ufo.png');
		this.load.image('alien', 'assets/sprites/space-baddie.png');
		this.load.image('brain', 'assets/sprites/brain.png');
		// this.load.image('asteroids', 'assets/sprites/asteroid_32x32x55.png');
		this.load.image('asteroid', 'assets/sprites/asteroid.png');

		// Projectiles
		this.load.image('bullet', 'assets/sprites/bullet.png');
		this.load.image('bullet-2', 'assets/sprites/enemy-bullet.png');

		// Misc
		this.load.image('steel', 'assets/sprites/steel-1.png');

		// Powerups
		this.load.image('orb', 'assets/sprites/orb.png');
		this.load.image('orb-red', 'assets/sprites/orb-red.png');
		this.load.image('orb-green', 'assets/sprites/orb-green.png');
		this.load.image('orb-blue', 'assets/sprites/orb-blue.png');
		this.load.image('skull', 'assets/sprites/skull.png');
		this.load.image('slime', 'assets/sprites/slime-power.png');
		this.load.image('flame', 'assets/sprites/flame.png');
		this.load.image('ice', 'assets/sprites/diamond.png');

		return this;
	}

	preloadFonts()
	{
		this.load.image('font', 'assets/sprites/ulm.png');

		return this;
	}

	preloadSpritesheets()
	{
		this.load.spritesheet('explode', 'assets/sprites/boom32wh12.png', {
			frameWidth: 32,
			frameHeight: 32,
			endFrame: 11
		});

		return this;
	}

	preloadAudio()
	{
		this.load.audio('sfx', [
			'assets/audio/mixdown.ogg',
			'assets/audio/mixdown.mp3'
		]);

		return this;
	}

	onProgress(value)
	{
		this.progress.clear();
		this.progress.fillStyle(0xffffff, 1);
		this.progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
	}

	onComplete()
	{
		this.progress.destroy();

		this.scene.start('GameScene');
	}

}

export default BootScene;
