function Axis(size=32)
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

		console.log(stop)

		return Phaser.Math.RND.integerInRange(start, stop);
	};

	array.randomIndexX = function randomIndex()
	{
		var offset = 1;
		var start = offset;
		// Clean up logic here, hardcoded! :0
		var stop = array.length - 1 - offset - 9;

		return Phaser.Math.RND.integerInRange(start, stop);
	};

	array.random = function random()
	{
		return array[array.randomIndex()];
	}

	array.randomX = function randomX()
	{
		return array[array.randomIndexX()];
	}

	array.centerIndex = 6;
	array.centerXIndex = 6;
	array.centerYIndex = 11;

	array.center = array[array.centerIndex];
	array.centerX = array[array.centerXIndex];
	array.centerY = array[array.centerYIndex];

	return array;
}

export default Axis;
