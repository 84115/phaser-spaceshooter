class Stats
{

	constructor(scene)
	{
		this.scene = scene;

		scene.statsData = {};

		var statsProps = [
			"score",
			"lives",
			"health",
			"shield",
			"ammo",
			"bulletspeed",
			"speed",
		];

		for (let i = 0; i < statsProps.length; i++)
		{
			scene.statsData[statsProps[i]] = scene.add
				.text(5, 2+(12 * i), "")
				.setFontFamily("monospace")
				.setFontSize(12)
				.setColor('#fff');

			scene.statsData[statsProps[i]].alpha = 0.8;
		}
	}

	updateStat(label, value="null", maxValue="")
	{
		if (label)
		{
			let string = label + ":" + value + (maxValue ? "/" + maxValue : "");

			this.scene.statsData[label].setText(string);
		}
	}

}

export default Stats;
