function Animations(scene)
{
    scene.anims.create(
    {
        key: 'explode-anim',
        frames: scene.anims.generateFrameNumbers('explode',
        {
        	start: 0,
        	end: 11,
        	first: 11
        }),
        frameRate: 10
    });

	return scene.anims;
}

export default Animations;
