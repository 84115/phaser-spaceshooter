import Sprite from '../sprites/Sprite';

class PlayerSprite extends Sprite
{

	constructor(scene, x, y, key)
	{
		super(scene, x, y, key);

		this.body.setCollideWorldBounds(true);

		this.lives = 3;

		this.prop = this.scene.props.addFolder("Player");
		this.prop.add(this, 'alive');
		this.prop.add(this, 'lives');
	}

	revive()
	{
		this.alive = true;
		this.alpha = 1;
		this.health = this.maxHealth;
		this.shield = this.maxShield;

		if (this.updateStat)
		{
			this.updateStat('health');
			this.updateStat('shield');
		}
	}

	kill()
	{
		this.alive = false;
		this.health = 0;

		if (this.updateStat)
		{
			this.updateStat('health');
		}

		if (this.lives > 0)
		{
			this.lives--;
		}

		this.alpha = 0.25;

		if (this.updateStat)
		{
			this.updateStat('lives');
		}

		if (this.lives > 0)
		{
			if (this.scene.StageTitle)
			{
				this.scene.StageTitle(this.scene, "Dead m8");
			}

			this.scene.time.addEvent({
				delay: 4000,
				callback: this.revive,
				callbackScope: this
			});
		}
		else if (this.lives == 0 && !this.scene.gameover)
		{
			this.scene.gameover = true;

			if (this.scene.StageTitle)
			{
				this.scene.StageTitle(this, "GameOver");
			}
		}
	}

}

export default PlayerSprite;