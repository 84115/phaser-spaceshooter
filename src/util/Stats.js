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
				.text(0, (16 * i), "")
				.setFontFamily("courier")
				.setFontSize(16)
				.setColor('#fff');
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
