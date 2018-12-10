require('./newStdLib');
const advent = require('./advent');
const input = [256, '97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190'];

function hash(list, twists, loops = 1) {
	var currPos = 0,
	 	skipSize = 0
	for (var _ = 0; _ < loops; _++) {
		twists.forEach(a => {
			var extract = list.splice(0, a);
			list = list.concat(extract.reverse());
			var skip = list.splice(0, skipSize);
			list = list.concat(skip);

			currPos = (currPos + a + skipSize);  
			skipSize = (skipSize + 1) % list.length;
		});
	}

	var offset = list.length - (currPos % list.length);
	var skip = list.splice(0, offset);
	list = list.concat(skip);
	return {list,skipSize, offset};
}

function part1(size, twists) {
	twists = twists.split(",").map(a => parseInt(a));

	var {list, skipSize} = hash(Array(size).fill(0).map((a,i) => i), twists);
	return list[0] * list[1]
}

function part2(size, twists) {
	var loops = 64;
	twists = twists.split("").map(a => a.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

	var {list, skipSize, offset} = hash(Array(size).fill(0).map((a,i) => i), twists, loops);

	out = '';
	for (var i = 0; i < 16; i++) {
		var sub = list.splice(0, 16);
		var xor = sub[0];
		for (var j = 1; j < 16; j++) {
			xor ^=  sub[j];
		}
		out += ("0" + xor.toString(16)).substr(-2);
	}

	return out;

}

advent.tests(part1, [[5, '3, 4, 1, 5', 12]]);
advent.runs(part1, input);

advent.tests(part2, [
	[256, [3, 4, 1, 5].map(a => String.fromCharCode(a)).reduce((a,c) => a + c),'a2582a3a0e66e6e86e3812dcb672a272'],
	[256, '','a2582a3a0e66e6e86e3812dcb672a272'],
	[256, 'AoC 2017', '33efeb34ea91902bb2f59c9920caa6cd'],
	[256, '1,2,3', '3efbe78a8d82f29979031a4aa0b16a9d'],
	[256, '1,2,4', '63960835bcdc130f0b66d7ff4f6a5a8e']
]);
advent.runs(part2, input);