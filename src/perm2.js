let map = {};

export function changeValue(steps, actionType) {
	let i, j;

	switch (actionType) {
		case 'Win':
			for (i = 0; i < steps.length; i = i + 2) {
				if (i !== steps.length - 1) {
					for (j in map[steps[i]].val) {
						if (map[steps[i]].val[j].perm === steps[i + 1]) {
							map[steps[i]].val[j].value -= 1;
						}
					}
				}
			}
			break;

		case 'Draw':
			for (i = 0; i < steps.length; i = i + 2) {
				if (i !== steps.length - 1) {
					for (j in map[steps[i]].val) {
						if (map[steps[i]].val[j].perm === steps[i + 1]) {
							map[steps[i]].val[j].value += 1;
						}
					}
				}
			}
			break;

		case 'Lose':
			for (i = 0; i < steps.length; i = i + 2) {
				if (i !== steps.length - 1) {
					for (j in map[steps[i]].val) {
						if (map[steps[i]].val[j].perm === steps[i + 1]) {
							map[steps[i]].val[j].value += 3;
						}
					}
				}
			}
			break;

		default:
			return;
	}

	localStorage.setItem('data', JSON.stringify(map));

	return map;
}

export function move(currentPerm, turn) {
	let nextState = '';
	let i,
		tot = 0;
	let rand = Math.random();
	let probCount = 0;

	for (i in map[currentPerm].val) {
		if (map[currentPerm].val[i].turn === turn) {
			tot += map[currentPerm].val[i].value;
		}
	}

	for (i in map[currentPerm].val) {
		probCount += map[currentPerm].val[i].value / tot;

		if (probCount > rand) {
			nextState = map[currentPerm].val[i].perm;
			break;
		}
	}
	return checkFinish(nextState);
}

export function checkFinish(currentPerm) {
	if (
		(currentPerm[0] === '1' && currentPerm[1] === '1' && currentPerm[2] === '1') ||
		(currentPerm[3] === '1' && currentPerm[4] === '1' && currentPerm[5] === '1') ||
		(currentPerm[6] === '1' && currentPerm[7] === '1' && currentPerm[8] === '1') ||
		(currentPerm[0] === '1' && currentPerm[3] === '1' && currentPerm[6] === '1') ||
		(currentPerm[1] === '1' && currentPerm[4] === '1' && currentPerm[7] === '1') ||
		(currentPerm[2] === '1' && currentPerm[5] === '1' && currentPerm[8] === '1') ||
		(currentPerm[0] === '1' && currentPerm[4] === '1' && currentPerm[8] === '1') ||
		(currentPerm[2] === '1' && currentPerm[4] === '1' && currentPerm[6] === '1')
	) {
		return {
			reply: 'Win'
		};
	} else if (
		(currentPerm[0] === '2' && currentPerm[1] === '2' && currentPerm[2] === '2') ||
		(currentPerm[3] === '2' && currentPerm[4] === '2' && currentPerm[5] === '2') ||
		(currentPerm[6] === '2' && currentPerm[7] === '2' && currentPerm[8] === '2') ||
		(currentPerm[0] === '2' && currentPerm[3] === '2' && currentPerm[6] === '2') ||
		(currentPerm[1] === '2' && currentPerm[4] === '2' && currentPerm[7] === '2') ||
		(currentPerm[2] === '2' && currentPerm[5] === '2' && currentPerm[8] === '2') ||
		(currentPerm[0] === '2' && currentPerm[4] === '2' && currentPerm[8] === '2') ||
		(currentPerm[2] === '2' && currentPerm[4] === '2' && currentPerm[6] === '2')
	) {
		return {
			reply: 'Lose',
			currentPerm
		};
	}

	let zeroCount = 0;
	for (let j in currentPerm) {
		if (currentPerm[j] === '0') {
			zeroCount++;
		}
	}

	if (zeroCount === 0) {
		return {
			reply: 'Draw'
		};
	} else {
		return {
			reply: 'Continue',
			currentPerm
		};
	}
}

if (localStorage.getItem('data')) {
	map = Object.assign({}, JSON.parse(localStorage.getItem('data')));
} else {
	// The method that prints all
	// possible strings of length k.
	// It is mainly a wrapper over
	// recursive function printAllKLengthRec()
	function printAllKLength(set, k) {
		let n = set.length;
		printAllKLengthRec(set, '', n, k);
	}

	// The main recursive method
	// to print all possible
	// strings of length k
	function printAllKLengthRec(set, prefix, n, k) {
		// Base case: k is 0,
		// print prefix
		if (k === 0) {
			perm.push(prefix);
			return;
		}

		// One by one add all characters
		// from set and recursively
		// call for k equals to k-1
		for (let i = 0; i < n; ++i) {
			// Next character of input added
			let newPrefix = `${prefix}${set[i]}`;
			// k is decreased, because
			// we have added a new character
			printAllKLengthRec(set, newPrefix, n, k - 1);
		}
	}

	let perm = [];
	let set = ['1', '2', '0'];
	printAllKLength(set, 9);

	for (let i in perm) {
		let count = 0;
		let val = [];
		for (let j = 0; j < perm[i].length; j++) {
			if (perm[i][j] === '0') {
				let valString = perm[i].slice(0, j) + '2' + perm[i].slice(j + 1, perm[i].length);
				let valString2 = perm[i].slice(0, j) + '1' + perm[i].slice(j + 1, perm[i].length);
				val.push({ perm: valString, value: 4, turn: '2' });
				val.push({ perm: valString2, value: 4, turn: '1' });
				count++;
			}
		}

		map[perm[i]] = { count: count, val: val };
	}
}
