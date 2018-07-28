function SfxObject(scene)
{
	let markers = [
		{ "name": "alien death", "start": 1, "end": 2 },
		{ "name": "boss hit", "start": 3, "end": 3.5 },
		{ "name": "escape", "start": 4, "end": 7.2 },
		{ "name": "meow", "start": 8, "end": 8.5 },
		{ "name": "numkey", "start": 9, "end": 9.1 },
		{ "name": "ping", "start": 10, "end": 11 },
		{ "name": "death", "start": 12, "end": 16.2 },
		{ "name": "shot", "start": 17, "end": 18 },
		{ "name": "squit", "start": 19, "end": 19.3 }
	]

	let sfx = scene.sound.add('sfx');

	for (let i = markers.length - 1; i >= 0; i--)
	{
		sfx.addMarker(markers[i]);
	}

	return sfx;
}

export default SfxObject;
