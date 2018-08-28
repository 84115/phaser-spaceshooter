class Controller
{

	constructor(scene)
	{
		this.scene = scene;

		this.keyboard = this.scene.input.keyboard;

		this.up = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.left = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.down = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.right = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		this.spacebar = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	}

}

export default Controller;
