function ControllerObject(scene)
{
	var controller = {};

	controller.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	controller.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	controller.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	controller.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

	return controller;
}

export default ControllerObject;
