const E = require('./tables').E;
const L = require('./tables').L;
const I = require('./tables').I;

module.exports = {
    mul: mul,
    add: add,
    inv: inv
};

function inv(a) {
    let [ar, as] = toHex(a).split('');

    return toInt(I[toInt(ar)][toInt(as)]);
}

function mul(a, b) {

    if (a == 0 || b == 0) {
        return 0;
    }

    let aHex = toHex(a);
    let bHex = toHex(b);

    let [ar, as] = aHex.split('');
    let [br, bs] = bHex.split('');

    let t = add(toInt(L[toInt(ar)][toInt(as)]), toInt(L[toInt(br)][toInt(bs)]));

    if (a == 0 && b == 0) {
        return 0;
    }

    if (t > 255) {
        t = t - 255;
    }

    let [tr, ts] = toHex(t);

    return toInt(E[toInt(tr)][toInt(ts)]);
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

const toInt = (number) => {
    return parseInt(number, 16);
};

const to8Bytes = (number) => {
    let truncStr = (number >>> 0).toString(2);
    let len = truncStr.length;


    return '0'.repeat(8 - len) + truncStr;
};

const toHex = (number) => {
    return number.toString(16).length === 2 ? number.toString(16) : '0' + number.toString(16)
};

//console.log(inv(0x07));
//console.log(mul(7, 209));
// console.log(add(0xA1, 0x09));

