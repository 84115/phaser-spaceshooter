function createAxis(size=32)
{
	var array = [-size];

	for (var i = 1; i < 22; i++)
	{
		array[i] = array[i - 1] + size;
	}

	array.randomIndex = function randomIndex()
	{
		var offset = 1;
		var start = offset;
		var stop = array.length - 1 - offset;
		return Phaser.Math.RND.integerInRange(start, stop);
	};

	array.random = function random()
	{
		return array[array.randomIndex()];
	}

	array.centerIndex = 6;
	array.centerXIndex = 6;
	array.centerYIndex = 11;

	array.center = array[array.centerIndex];
	array.centerX = array[array.centerXIndex];
	array.centerY = array[array.centerYIndex];

	return array;
}

export default createAxis;
