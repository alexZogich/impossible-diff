const a = null;
'use strict';

const constants = require('./constants.js');
const helper = require('./helper.js');
const rank = require('./rank.js');
const math = require('mathjs');

const setOfZeroDiffs = [];
const setOfNonZeroDiffs = [];

//const initP = [0,'a1',1,0];
//const initC = ['a1',[['a1', 5]],0,0];
const initP = ['a1', 'a1', 0, 'a1', 0, 0, 0, 0, 'a1', 0, 0, 'a1', 0, 0, 0, 'a1'];
const initC = ['b1', 0, 'b1', 0, 0, 0, 0, 'b1', 0, 0, 0, 'b1', 0, 0, 0, 'b1'];

init(initP, initC);
//console.log(helper.buildAlphaItem(initP, initC));
//console.log(initMatrixB(initP, initC));
//console.log(helper.rank());

function init(deltaP, deltaC) {
    let length = deltaP.length;
    let Bshtrih = initMatrixB(deltaP);
    let n = Bshtrih[0].length;

    for(let i = 0; i < length; i ++) {

        if(deltaP[i] == 0) {
            setOfZeroDiffs.push(deltaP[i]);
            Bshtrih = MulCol(Bshtrih, i);
        } else {
            setOfNonZeroDiffs.push(deltaP[i]);
        }

        if(deltaC[i] == 0) {
            setOfZeroDiffs.push(deltaC[i]);
            Bshtrih = MulCol(Bshtrih, i);
        } else {
            setOfNonZeroDiffs.push(deltaC[i]);
        }

    }

    rank(Bshtrih);
}   

function initMatrixB(vectorX) {
    let A = constants.A;
    let vectorB = null;

    vectorB = vectorX.map( (item, i) => {
        if(helper.canBeMultiplied(vectorX, A[i])) {
            let tempVectorToMul = null;
            
            tempVectorToMul = vectorX.map( (item) => {
                return typeof item == 'number' ? item : 0;
            });

            return math.multiply(tempVectorToMul, A[i]);
        } else {
            return helper.buildAlphaItem(vectorX, A[i]);
        }
    });

    return A.map( (item, i ) => {
        return item.concat([vectorB[i]]);
    });
}

function MulCol(matrix, columnNum) {
    return matrix.map( (item) => {
        item[columnNum] = 0;
        return item;
    });
}

function ColSubMatrix(matrix, from, to) {
    return matrix.map( (item, i) => {
        return item.slice(from - 1, to);
    });
}
