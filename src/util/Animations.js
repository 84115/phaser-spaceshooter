class Animations
{

    constructor(scene)
    {
        this.scene = scene;

        this.scene.anims.create(
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

    }

}

export default Animations;
