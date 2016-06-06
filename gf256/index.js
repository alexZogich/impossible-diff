const E = require('./tables').E;
const L = require('./tables').L;
const I = require('./tables').I;

module.exports = {
	mul: mul,
	add: add,
	inv: inv
}

function inv(a) {
	let aHex = toHex(a).split('');

	return I[aHex[1]][aHex[0]];
}

function mul(a, b) {
	let aHex = toHex(a);
	let bHex = toHex(b);
	
	let aHexDgt = aHex.split('');
	let bHexDgt = bHex.split('');

	let t = add(L[aHexDgt[1]][aHexDgt[0]], L[bHexDgt[1]][bHexDgt[0]])

	if( a == 0 && b == 0) {
		return 0;
	}

	if(t > 255) {
		t = t - 255;
	}

	t = toHex(t);

	return parseInt(E[t[1]][t[0]], 16);
}

function add(a, b) {
	let vectorA = to8Bytes(a).split('');
	let vectorB = to8Bytes(b).split('');
	let resultVector = [];

	vectorA.forEach((item, i) => {
		resultVector.push(vectorA[i] ^ vectorB[i]);
	});

	return parseInt(resultVector.join(''), 2);
}

const to8Bytes = (number) => {
	let truncStr = (number >>> 0).toString(2);
	let len = truncStr.length;


	return '0'.repeat(8 - len) + truncStr;
}

const toHex = (number) => {
	return number.toString(16).length === 2 ? number.toString(16) : '0' + number.toString(16)
}

// console.log(to8Bytes(0xFF));
// console.log(to8Bytes(0xFF));
// console.log(add(0xA1, 0x09));

