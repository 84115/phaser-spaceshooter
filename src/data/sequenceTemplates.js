let sequenceTemplates =
{

	"leftToRight":
	{
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
	},

	"rightToLeft":
	{
		ease: 'Power1',
		duration: 5000,
		offset: 1000,
		coords: [
			{ start: { x: 12, y: 2 }, stop: { x: 0, y: 2 } },
			{ start: { x: 12, y: 3 }, stop: { x: 0, y: 3 } },
			{ start: { x: 12, y: 4 }, stop: { x: 0, y: 4 } },
			{ start: { x: 12, y: 5 }, stop: { x: 0, y: 5 } },
			{ start: { x: 12, y: 6 }, stop: { x: 0, y: 6 } },
			{ start: { x: 12, y: 7 }, stop: { x: 0, y: 7 } },
			{ start: { x: 12, y: 8 }, stop: { x: 0, y: 8 } },
			{ start: { x: 12, y: 9 }, stop: { x: 0, y: 9 } },
		]
	},

	"crossroad":
	{
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
	},

	"diagTopLeftToBottomRight":
	{
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
	},

	"wallBottomLeftToTopRight":
	{
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
	},

	// "static":
	// {
	// 	ease: 'Power1',
	// 	duration: 1000000,
	// 	offset: 0,
	// 	coords: [
	// 		{ start: { x: 1, y: 1 }, stop: { x: 1, y: 1 } },
	// 		{ start: { x: 2, y: 1 }, stop: { x: 2, y: 1 } },
	// 		{ start: { x: 3, y: 1 }, stop: { x: 3, y: 1 } },
	// 		{ start: { x: 4, y: 1 }, stop: { x: 4, y: 1 } },
	// 		{ start: { x: 5, y: 1 }, stop: { x: 5, y: 1 } },
	// 		{ start: { x: 6, y: 1 }, stop: { x: 6, y: 1 } },
	// 		{ start: { x: 9, y: 1 }, stop: { x: 9, y: 1 } },
	// 		{ start: { x: 10, y: 1 }, stop: { x: 10, y: 1 } },

	// 		{ start: { x: 1, y: 2 }, stop: { x: 1, y: 2 } },
	// 		{ start: { x: 10, y: 2 }, stop: { x: 10, y: 2 } },

	// 		{ start: { x: 1, y: 3 }, stop: { x: 1, y: 3 } },
	// 		{ start: { x: 10, y: 3 }, stop: { x: 10, y: 3 } },

	// 		{ start: { x: 1, y: 4 }, stop: { x: 1, y: 4 } },
	// 		{ start: { x: 2, y: 4 }, stop: { x: 2, y: 4 } },
	// 		{ start: { x: 3, y: 4 }, stop: { x: 3, y: 4 } },
	// 		{ start: { x: 4, y: 4 }, stop: { x: 4, y: 4 } },
	// 		{ start: { x: 5, y: 4 }, stop: { x: 5, y: 4 } },
	// 		{ start: { x: 6, y: 4 }, stop: { x: 6, y: 4 } },
	// 		{ start: { x: 9, y: 4 }, stop: { x: 9, y: 4 } },
	// 		{ start: { x: 10, y: 4 }, stop: { x: 10, y: 4 } },
	// 	]
	// },

};

export default sequenceTemplates;
