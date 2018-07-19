import ShipSprite from '../sprites/Sprite';

class GameScene extends Phaser.Scene
{

	constructor(test)
	{
		super({ key: 'GameScene' });
	}

	preload()
	{
	}

	create()
	{
		this.ship = new ShipSprite(this, 160, 320, 'ship');
	}

	update(time, delta)
	{
	}
}

export default GameScene;
