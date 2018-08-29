function Axis(baseSize=32)
{
	var size = baseSize / 10;
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

	array.randomIndexX = function randomIndex(padded=false)
	{
		var offset = 1;
		var start = offset  + (padded ? 1 : 0);

		// Clean up logic here, hardcoded! :0
		var stop = (array.length - 1 - offset - 9) + (padded ? -1 : 0);

		return Phaser.Math.RND.integerInRange(start, stop);
	};

	array.randomIndexY = function randomIndex(padded=false)
	{
		var offset = 1;
		var start = offset  + (padded ? 1 : 0);

		// Clean up logic here, hardcoded! :0
		var stop = (array.length - 1 - offset) + (padded ? -1 : 0);

		return Phaser.Math.RND.integerInRange(start, stop);
	};

	array.random = function random()
	{
		return array[array.randomIndex()];
	}

	array.randomX = function randomX(padded=false)
	{
		return array[array.randomIndexX(padded)];
	}

	array.randomY = function randomY(padded=false)
	{
		return array[array.randomIndexY(padded)];
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
