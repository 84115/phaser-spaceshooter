let sequences = {};

let clone = (lookup, clip=0) => clip ? sequences[lookup].coords.slice(0, clip) : sequences[lookup].coords.slice();

let glue = (...arrays) => [].concat(...arrays);

let reverse = (lookup) => clone(lookup).reverse()

let shuffle = (lookup) => Phaser.Utils.Array.Shuffle(clone(lookup));

let range = (start, stop) => Phaser.Utils.Array.NumberArray(start, stop);

let times = (items, amount=1) => Array.prototype.map.call(range(1, amount), () => items);

// let flipX = ...
// let flipY = ...

sequences["leftToRight"] = {
	ease: 'Power1',
	duration: 5000,
	offset: 1000,
	coords: [
		{ start: { x: 0, y: 2 }, stop: { x: 12, y: 2 } },
		{ start: { x: 0, y: 3 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 4 }, stop: { x: 12, y: 4 } },
		{ start: { x: 0, y: 5 }, stop: { x: 12, y: 5 } },
		{ start: { x: 0, y: 6 }, stop: { x: 12, y: 6 } },
		{ start: { x: 0, y: 7 }, stop: { x: 12, y: 7 } },
		{ start: { x: 0, y: 8 }, stop: { x: 12, y: 8 } },
		{ start: { x: 0, y: 9 }, stop: { x: 12, y: 9 } },
	]
};

sequences["rightToLeft"] = {
	ease: 'Power1',
	duration: 5000,
	offset: 1000,
	coords: reverse("leftToRight")
};

sequences["crossroad"] = {
	ease: 'Power1',
	duration: 3000,
	offset: 300,
	coords: [
		{ start: { x: 12, y: 2 }, stop: { x: 0, y: 2 } },
		{ start: { x: 0, y: 3 }, stop: { x: 12, y: 3 } },
		{ start: { x: 12, y: 4 }, stop: { x: 0, y: 4 } },
		{ start: { x: 0, y: 5 }, stop: { x: 12, y: 5 } },
		{ start: { x: 12, y: 6 }, stop: { x: 0, y: 6 } },
		{ start: { x: 0, y: 7 }, stop: { x: 12, y: 7 } },
		{ start: { x: 12, y: 8 }, stop: { x: 0, y: 8 } },
		{ start: { x: 0, y: 9 }, stop: { x: 12, y: 9 } },
	]
};

sequences["diagTopLeftToBottomRight"] = {
	ease: 'Power1',
	duration: 6000,
	offset: 1000,
	coords: [
		{ start: { x: 0, y: 0 }, stop: { x: 7, y: 19 } },
		{ start: { x: 12, y: 0 }, stop: { x: 5, y: 19 } },

		{ start: { x: 0, y: 0 }, stop: { x: 8, y: 18 } },
		{ start: { x: 12, y: 0 }, stop: { x: 4, y: 18 } },

		{ start: { x: 0, y: 0 }, stop: { x: 9, y: 17 } },
		{ start: { x: 12, y: 0 }, stop: { x: 3, y: 17 } },

		{ start: { x: 0, y: 0 }, stop: { x: 10, y: 16 } },
		{ start: { x: 12, y: 0 }, stop: { x: 2, y: 16 } },
	]
};

sequences["wallBottomLeftToTopRight"] = {
	ease: 'Power1',
	// duration: 500,
	// offset: 50,
	duration: 7500,
	offset: 500,
	coords: [
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
		{ start: { x: 0, y: 15 }, stop: { x: 12, y: 3 } },
	]
};

sequences["strikeTopBottom"] = {
	ease: 'Ease',
	duration: 1500,
	offset: 250,
	coords: [
		{ start: { x: 10, y: 0 }, stop: { x: 10, y: 21 } },
		{ start: { x: 9, y: 0 }, stop: { x: 9, y: 21 } },
		{ start: { x: 8, y: 0 }, stop: { x: 8, y: 21 } },
		{ start: { x: 7, y: 0 }, stop: { x: 7, y: 21 } },
		{ start: { x: 6, y: 0 }, stop: { x: 6, y: 21 } },
		{ start: { x: 5, y: 0 }, stop: { x: 5, y: 21 } },
		{ start: { x: 4, y: 0 }, stop: { x: 4, y: 21 } },
		{ start: { x: 3, y: 0 }, stop: { x: 3, y: 21 } },
		{ start: { x: 2, y: 0 }, stop: { x: 2, y: 21 } },
	]
};

sequences["strikeTopBottomLeftRight"] = {
	ease: 'Ease',
	duration: 1500,
	offset: 250,
	coords: clone("strikeTopBottom")
};

sequences["strikeTopBottomRightLeft"] = {
	ease: 'Ease',
	duration: 1500,
	offset: 250,
	coords: reverse("strikeTopBottomLeftRight")
};

sequences["strikeTopBottomRandom"] = {
	ease: 'Ease',
	duration: 1500,
	offset: 250,
	coords: shuffle("strikeTopBottomLeftRight")
};

sequences["strikeTopBottomSnake"] = {
	ease: 'Ease',
	duration: 3000,
	offset: 150,
	coords: glue(
		clone("strikeTopBottomLeftRight", -1),
		clone("strikeTopBottomRightLeft", -1),
		clone("strikeTopBottomLeftRight", -1),
		clone("strikeTopBottomRightLeft")
	)
};

sequences["fallDiagLeftToRight"] = {
	ease: 'Ease',
	duration: 4000,
	offset: 200,
	coords: clone("strikeTopBottomLeftRight")
};

sequences["fallDiagRightToLeft"] = {
	ease: 'Ease',
	duration: 4000,
	offset: 200,
	coords: reverse("strikeTopBottomLeftRight")
};

sequences["fallGapsOne"] = {
	ease: 'Ease',
	duration: 4000,
	offset: 1,
	coords: [
		{ start: { x: 1, y: 0 }, stop: { x: 1, y: 21 } },
		{ start: { x: 3, y: 0 }, stop: { x: 3, y: 21 } },
		{ start: { x: 5, y: 0 }, stop: { x: 5, y: 21 } },
		{ start: { x: 7, y: 0 }, stop: { x: 7, y: 21 } },
		{ start: { x: 9, y: 0 }, stop: { x: 9, y: 21 } },
		{ start: { x: 11, y: 0 }, stop: { x: 11, y: 21 } },
	]
};

sequences["fallGapsTwo"] = {
	ease: 'Ease',
	duration: 4000,
	offset: 1,
	coords: [
		{ start: { x: 2, y: 0 }, stop: { x: 2, y: 21 } },
		{ start: { x: 4, y: 0 }, stop: { x: 4, y: 21 } },
		{ start: { x: 6, y: 0 }, stop: { x: 6, y: 21 } },
		{ start: { x: 8, y: 0 }, stop: { x: 8, y: 21 } },
		{ start: { x: 10, y: 0 }, stop: { x: 10, y: 21 } },
	]
};

sequences["randSpikes"] = {
	ease: 'Ease',
	duration: 2500,
	offset: 0,
	coords: [
		{ start: { x: 8, y: 21 }, stop: { x: 8, y: 0 } },
		{ start: { x: 10, y: 21 }, stop: { x: 10, y: 0 } },
		{ start: { x: 4, y: 0 }, stop: { x: 4, y: 21 } },
		{ start: { x: 0, y: 2 }, stop: { x: 11, y: 2 } },
		{ start: { x: 2, y: 0 }, stop: { x: 2, y: 21 } },
		{ start: { x: 12, y: 20 }, stop: { x: 0, y: 20 } },
	]
};

sequences["powerupOne"] = {
	ease: 'Ease',
	duration: 5000,
	offset: 1,
	coords: [
		{ start: { x: 6, y: 0 }, stop: { x: 6, y: 21 } },
	]
};

sequences["powerupTwo"] = {
	ease: 'Ease',
	duration: 6000,
	offset: 1,
	coords: [
		{ start: { x: 5, y: 0 }, stop: { x: 5, y: 21 } },
		{ start: { x: 7, y: 0 }, stop: { x: 7, y: 21 } },
	]
};

sequences["powerupThree"] = {
	ease: 'Ease',
	duration: 6000,
	offset: 1,
	coords: [
		{ start: { x: 5, y: 0 }, stop: { x: 5, y: 21 } },
		{ start: { x: 6, y: 0 }, stop: { x: 6, y: 21 } },
		{ start: { x: 7, y: 0 }, stop: { x: 7, y: 21 } },
	]
};

sequences["glue"] = {
	ease: 'Ease',
	duration: 1500,
	offset: 100,
	coords: glue(
		clone("strikeTopBottomLeftRight", -1),
		clone("strikeTopBottomRightLeft"),
		clone("strikeTopBottomRandom"),
		clone("strikeTopBottomRandom"),
		clone("strikeTopBottomRightLeft", -1),
		clone("strikeTopBottomLeftRight"),
		clone("strikeTopBottomRandom"),
		clone("strikeTopBottomRandom")
	)
};

sequences["artillery"] = {
	ease: 'Ease',
	duration: 4000,
	offset: 1000,
	coords: times({ start: { x: 2, y: 0 }, stop: { x: 2, y: 21 } }, 5)
};

export default sequences;
