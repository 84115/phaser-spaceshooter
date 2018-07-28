class Stats
{

	constructor(scene)
	{
		this.scene = scene;

		scene.status = {};

		var statusProps = [
			"score",
			"lives",
			"health",
			"shield",
			"ammo",
			"bulletspeed",
			"speed",
		];

		for (let i = 0; i < statusProps.length; i++)
		{
			scene.status[statusProps[i]] = scene.add
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

			this.scene.status[label].setText(string);
		}
	}

}

export default Stats;
