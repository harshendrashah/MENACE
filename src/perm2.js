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
	console.log("changeValue", actionType)
	localStorage.setItem('data', JSON.stringify(map));

	return map;
}

export function move(currentPerm, turn) {
	let nextState = '';
	let i,tot = 0,j;
	let rand = Math.random();
	let probCount = 0;
	//console.log("map",map, currentPerm)
	for (i in map[currentPerm].val){
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
	let value = [];
	let count = 0;
	for (j = 0; j < nextState; j++) {
		if (nextState[j] === '0') {
			let valString = nextState.slice(0, j) + '2' + nextState.slice(j + 1, nextState.length);
			let valString2 = nextState.slice(0, j) + '1' + nextState.slice(j + 1, nextState.length);
			value.push({ perm: valString, value: 4, turn: '2' });
			value.push({ perm: valString2, value: 4, turn: '1' });
			count++;
		}
	}
	map[nextState] = {"val":value, "count": count}
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
		console.log("Win")
		return {
			reply: 'Win',
			currentPerm
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
		console.log("lose")
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
		console.log("Draw")
		return {
			reply: 'Draw',
			currentPerm
		};
	} else {
		console.log("Continue")
		return {
			reply: 'Continue',
			currentPerm
		};
	}
}

if (localStorage.getItem('data')) {
	map = Object.assign({}, JSON.parse(localStorage.getItem('data')));
} else {
	let value = [];
	
	value.push({"perm": "200000000","value": 4, "turn": "2"})
	value.push({"perm": "100000000","value": 4, "turn": "1"})
	value.push({"perm": "020000000","value": 4, "turn": "2"})
	value.push({"perm": "010000000","value": 4, "turn": "1"})
	value.push({"perm": "002000000","value": 4, "turn": "2"})
	value.push({"perm": "001000000","value": 4, "turn": "1"})
	value.push({"perm": "000200000","value": 4, "turn": "2"})
	value.push({"perm": "000100000","value": 4, "turn": "1"})
	value.push({"perm": "000020000","value": 4, "turn": "2"})
	value.push({"perm": "000010000","value": 4, "turn": "1"})
	value.push({"perm": "000002000","value": 4, "turn": "2"})
	value.push({"perm": "000001000","value": 4, "turn": "1"})
	value.push({"perm": "000000200","value": 4, "turn": "2"})
	value.push({"perm": "000000100","value": 4, "turn": "1"})
	value.push({"perm": "000000020","value": 4, "turn": "2"})
	value.push({"perm": "000000010","value": 4, "turn": "1"})
	value.push({"perm": "000000002","value": 4, "turn": "2"})
	value.push({"perm": "000000001","value": 4, "turn": "1"})
	map["000000000"] = {"val": value, "count": 18}
	//console.log("init", map)
}

