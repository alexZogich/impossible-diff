'use strict';

const gf256 = require('./gf256');

module.exports = (inputMatrix) => {
	let matrix = [...inputMatrix];
	let modifiedFirsRow = multiplyRowByNumber(matrix[0], matrix[0][0]);

	matrix[0] = modifiedFirsRow;

	getZeroCols(matrix);
	transformFirstColumn(matrix);
};

const getZeroCols = (matrix) => {
	let zeroIndexes = matrix[0].reduce(function(a, e, i) {
		if (e == 0) {
			a.push(i);
		}
		return a;
	}, []);

	matrix.forEach( (item,i) => {
		if(i != 0) {
			item.forEach( (element, j) => {
				let index = zeroIndexes.indexOf(j);

				if (index != -1) {
					if(element != 0) {
						zeroIndexes.splice(index, 1);
					}
				}
			});
		}
	});

	return zeroIndexes;
};

const multiplyRowByNumber = (row, number) => {

	if (number == 1) {
		return row;
	}

	let inv = gf256.inv(number);

	return row.map( (item) => {
		if(typeof item == 'number') {
			return gf256.mul(item, inv);
		} else if(typeof item == 'string') {
			throw new Error('Rank element is String');
		} else {
			return item.map( (diffItems, i) => {
				if(typeof diffItems == 'number') {
					return gf256.mul(diffItems, inv);
				} else {
					let isNumberPresent = false;
					let result = diffItems.map( (diffItem) => {
						if(typeof diffItem == 'number') {
							isNumberPresent = true;
							return gf256.mul(diffItem, inv);
						}
						return diffItem;
					});

					if(!isNumberPresent) {
						result.push(inv);
					}
					return result;
				}
			});
		}
	});
};

const transformFirstColumn = (matrix) => {
	let firstRow = matrix[0];

	return matrix.map( (row, i) => {
		if (i == 0) return row;


		return substractRows(multiplyRowByNumber(row, gf256.inv(row[0])), firstRow);
	});
};

const substractRows = (rowA, rowB) => {
	return rowA.map( (item, i) => {
		if(typeof item == 'number' && typeof rowB[i] == 'number') {
			return gf256.add(item, rowB[i]);
		} else if (Array.isArray(item) && Array.isArray(rowB[i])) {
			let resultItem = [];
			let rowBRestDiffs = [...rowB[i]];

			item.forEach( (diffItemLeft) => {

				rowB[i].forEach( (diffItemRight) => {

					if(isSameDiffs(diffItemLeft, diffItemRight)) {
						let a = diffItemLeft.sort()[0];
						let b = diffItemRight.sort()[0];
						let diff = diffItemRight.sort()[1];

						resultItem.push([diff, gf256.add(a, b)]);

						rowBRestDiffs.splice(rowBRestDiffs.indexOf(diffItemRight), 1);
					}

					if(typeof diffItemRight == 'number' || typeof diffItemLeft == 'number') {
						resultItem.push(gf256.add(diffItemRight, diffItemLeft));
						rowBRestDiffs.splice(rowBRestDiffs.indexOf(diffItemRight), 1);
					}
				});

			});

			return resultItem.concat(rowBRestDiffs);

		} else {
			throw new Error('substractRow error')
		}
	})
};

const isSameDiffs = (diffA, diffB) => {
	let flag = false;

	diffA.forEach( (itemLeft) => {
		if (typeof itemLeft == 'string') {
			diffB.forEach( (itemRight) => {
				if( itemLeft == itemRight) {
					flag = true;
				}
			});
		}
	});

	return flag;
};
