class Sfx
{

	constructor(scene)
	{
		this.scene = scene;

		this.markers = [
			{ "name": "alien death", "start": 1, "duration": 1 },
			{ "name": "boss hit", "start": 3, "duration": 0.5 },
			{ "name": "escape", "start": 4, "duration": 3.2 },
			{ "name": "meow", "start": 8, "duration": 0.5 },
			{ "name": "numkey", "start": 9, "duration": 0.1 },
			{ "name": "ping", "start": 10, "duration": 1 },
			{ "name": "death", "start": 12, "duration": 4.2 },
			{ "name": "shot", "start": 17, "duration": 1 },
			{ "name": "squit", "start": 19, "duration": 0.3 },
		]

		this.audio = this.scene.sound.add('sfx');

		for (let i = this.markers.length - 1; i >= 0; i--)
		{
			this.audio.addMarker(this.markers[i]);
		}

		return this;
	}

	play(key="")
	{
		if (key)
		{
			this.audio.play(key);
		}
	}

}

export default Sfx;
