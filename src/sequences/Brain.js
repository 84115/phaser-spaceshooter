import Bullet from '../sprites/Bullet';

function BrainSequence(scene)
{
	var cord = [
		scene.grid[6], scene.grid[3],
		scene.grid[9], scene.grid[4],
		scene.grid[3], scene.grid[6],
		scene.grid[9], scene.grid[8],
		scene.grid[3], scene.grid[10],
		scene.grid[9], scene.grid[12],
		scene.grid[6], scene.grid[13],
		scene.grid[3], scene.grid[12],
		scene.grid[9], scene.grid[10],
		scene.grid[3], scene.grid[8],
		scene.grid[9], scene.grid[6],
		scene.grid[3], scene.grid[4],
		scene.grid[6], scene.grid[3],
	];

	var path = new Phaser.Curves.Spline(cord);
	var drawPath = scene.add.graphics();

	drawPath.lineStyle(1, 0xffffff, 1);

	if (scene.physics.config.debug)
	{
		path.draw(drawPath, 64);
	}

	var brain = scene.add.follower(path, cord[0], cord[1], 'brain');
	brain.alive = true;

	scene.physics.world.enable(brain);

	brain.body.setCircle(Math.round((brain.height + brain.width) / 4));

	brain.startFollow({
		duration: 15000,
		loop: -1,
		ease: 'Sine.easeInOut'
	});

	brain.projectile = scene.physics.add.group({
		classType: () => new Bullet(scene, 'bullet', 100, 250),
		maxSize: 50,
		runChildUpdate: true
	});

	scene.time.addEvent({
		delay: 2000,
		callback: () =>
		{
			scene.background.scroll = scene.background.scroll * 2;
		}
	});

	brain.timer = scene.time.addEvent({
		delay: 1250,
		callback: () =>
		{
			if (brain.alive)
			{
				brain.projectile.get().setTint(0xff0000).fire(brain.x, brain.y + (brain.height / 2));
				brain.projectile.get().setTint(0xff0000).fire(brain.x - (brain.width / 2), brain.y);
				brain.projectile.get().setTint(0xff0000).fire(brain.x + (brain.width / 2), brain.y);
			}
			else
			{
				brain.timer.remove(false);
			}
		},
		loop: true
	});

	return brain;
}

export default BrainSequence;
