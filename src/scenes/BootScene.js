class BootScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'BootScene' });
	}

	preload()
	{
		// this.load.setBaseURL('http://labs.phaser.io');

		this.load.image('ship', 'assets/sprites/shmup-ship.png');
		this.load.image('boom', 'assets/sprites/shmup-boom.png');
		this.load.image('bullet', 'assets/sprites/bullet.png');
		this.load.image('ufo', 'assets/sprites/ufo.png');
		this.load.image('skull', 'assets/sprites/skull.png');
		this.load.image('brain', 'assets/sprites/brain.png');
		this.load.image('sky', 'assets/skies/space3.png');
		this.load.image('red', 'assets/particles/red.png');
		this.load.image('orb-red', 'assets/sprites/orb-red.png');
		this.load.image('orb-green', 'assets/sprites/orb-green.png');
		this.load.image('orb-blue', 'assets/sprites/orb-blue.png');
		this.load.image('font', 'assets/fonts/retro/ulm.png');

	    this.load.spritesheet('explode', 'assets/sprites/boom32wh12.png', {
	    	frameWidth: 32,
	    	frameHeight: 32,
	    	endFrame: 11
	    });

		this.load.audio('sfx', [
			'assets/audio/SoundEffects/fx_mixdown.ogg',
			'assets/audio/SoundEffects/fx_mixdown.mp3'
		]);
	}

	create()
	{
		this.scene.start('TitleScene');
	}

	update()
	{
	}
}

export default BootScene;
