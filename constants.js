'use strict';

const matrixMTrans = [
    [0x01, 0x01, 0x05, 0x01, 0x08, 0x06, 0x07, 0x04],
    [0x04, 0x01, 0x01, 0x05, 0x01, 0x08, 0x06, 0x07],
    [0x07, 0x04, 0x01, 0x01, 0x05, 0x01, 0x08, 0x06],
    [0x06, 0x07, 0x04, 0x01, 0x01, 0x05, 0x01, 0x08],
    [0x08, 0x06, 0x07, 0x04, 0x01, 0x01, 0x05, 0x01],
    [0x01, 0x08, 0x06, 0x07, 0x04, 0x01, 0x01, 0x05],
    [0x05, 0x01, 0x08, 0x06, 0x07, 0x04, 0x01, 0x01],
    [0x01, 0x05, 0x01, 0x08, 0x06, 0x07, 0x04, 0x01]
];

const M = [
    [0x01, 0x04, 0x07, 0x06, 0x08, 0x01, 0x05, 0x01],
    [0x01, 0x01, 0x04, 0x07, 0x06, 0x08, 0x01, 0x05],
    [0x05, 0x01, 0x01, 0x04, 0x07, 0x06, 0x08, 0x01],
    [0x01, 0x05, 0x01, 0x01, 0x04, 0x07, 0x06, 0x08],
    [0x08, 0x01, 0x05, 0x01, 0x01, 0x04, 0x07, 0x06],
    [0x06, 0x08, 0x01, 0x05, 0x01, 0x01, 0x04, 0x05],
    [0x07, 0x06, 0x08, 0x01, 0x05, 0x01, 0x01, 0x01],
    [0x04, 0x07, 0x06, 0x08, 0x01, 0x05, 0x01, 0x01]
];

const matrixA = [
    [0x01, 0x04, 0x07, 0x06, 0, 0, 0, 0, 0, 0, 0, 0, 0x08, 0x01, 0x05, 0x01],
    [0x01, 0x01, 0x04, 0x07, 0, 0, 0, 0, 0, 0, 0, 0, 0x06, 0x08, 0x01, 0x05],
    [0x05, 0x01, 0x01, 0x04, 0, 0, 0, 0, 0, 0, 0, 0, 0x07, 0x06, 0x08, 0x01],
    [0x01, 0x05, 0x01, 0x01, 0, 0, 0, 0, 0, 0, 0, 0, 0x04, 0x07, 0x06, 0x08],
    [0x08, 0x01, 0x05, 0x01, 0, 0, 0, 0, 0, 0, 0, 0, 0x01, 0x04, 0x07, 0x06],
    [0x06, 0x08, 0x01, 0x05, 0, 0, 0, 0, 0, 0, 0, 0, 0x01, 0x01, 0x04, 0x05],
    [0x07, 0x06, 0x08, 0x01, 0, 0, 0, 0, 0, 0, 0, 0, 0x05, 0x01, 0x01, 0x01],
    [0x04, 0x07, 0x06, 0x08, 0, 0, 0, 0, 0, 0, 0, 0, 0x01, 0x05, 0x01, 0x01],
    [0, 0, 0, 0, 0x08, 0x01, 0x05, 0x01, 0x01, 0x04, 0x07, 0x06, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x06, 0x08, 0x01, 0x05, 0x01, 0x01, 0x04, 0x07, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x07, 0x06, 0x08, 0x01, 0x05, 0x01, 0x01, 0x04, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x04, 0x07, 0x06, 0x08, 0x01, 0x05, 0x01, 0x01, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x01, 0x04, 0x07, 0x06, 0x08, 0x01, 0x05, 0x01, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x01, 0x01, 0x04, 0x05, 0x06, 0x08, 0x01, 0x05, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x05, 0x01, 0x01, 0x01, 0x07, 0x06, 0x08, 0x01, 0, 0, 0, 0],
    [0, 0, 0, 0, 0x01, 0x05, 0x01, 0x01, 0x04, 0x07, 0x06, 0x08, 0, 0, 0, 0]
];

const ZERO = 0;

module.exports = {
	ZERO: ZERO,
	A: matrixA,
	M: M
};