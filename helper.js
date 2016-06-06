const gf256 = require('./gf256');

module.exports = {
	canBeMultiplied: canBeMultiplied,
	buildAlphaItem: buildAlphaItem
};

function canBeMultiplied(vectorA, vectorB) {
        let result = vectorA.some( (item , i) => {

            if (item == 0) {
                return false;
            } else if (typeof item == 'number') {
                return typeof vectorB[i] != 'number';
            } else {
                return vectorB[i] != 0;
            }
        });

        return !result;
}

function buildAlphaItem(vectorA, vectorB) {
    let length = vectorA.length;
    let numericalPart = 0;
    let result = [];

    for(let i = 0; i < length; i++) {
        if (vectorA[i] == 0 || vectorB[i] == 0){
            //do nothing :(
        } else if (typeof vectorA[i] == 'number' && typeof vectorB[i] == 'number') {
            numericalPart = gf256.add(numericalPart, gf256.mul(vectorA[i], vectorB[i]));
        } else if (typeof vectorA[i] != 'object' && typeof vectorB[i] != 'object') {
            let newItem = [vectorA[i], vectorB[i]];

			if(result.length) {
				pushNewItem(result, newItem);	
			} else {
				result.push(newItem);
			}
			            
		} else if (typeof vectorA[i] == 'object' && typeof vectorB[i] == 'object') {
            // TODO
        } else {
        	// Array * primitive
            let array = Array.isArray(vectorA[i]) ? [...vectorA[i]] : [...vectorB[i]];
            let element = Array.isArray(vectorA[i]) ? vectorB[i] : vectorA[i];

            array.forEach( (item, j) => {
                if(typeof item == 'number') {
                    let resultElement = item * element ?
                        item * element :
                        [item, element];
                    result.push(resultElement);
                } else {
                    if( typeof element != 'number') {
                    	result.push(item.concat(element));
                    } else {
	                    result.push(findNumberAndMultiply(item, element));                    	
                    }
                }
            });
        }
    }

    if(numericalPart) {
    	result.push(numericalPart);
    }

    return result;
}

function findNumberAndMultiply(array, numToMul) {
	let result = array.map( (item) => {
		return typeof item == 'number' ? item * numToMul : item 
	});

	return JSON.stringify(array) == JSON.stringify(result) ?
		result.concat(numToMul) :
		result;
}

function pushNewItem(result, newItem) {
	let [firstElement, secondElement] = newItem;

	// console.log(firstElement);
	// console.log(secondElement);

	result.forEach( (item) => {
		if (typeof firstElement == 'string') {
			addNewItem(item, firstElement, secondElement);
		}

		if (typeof secondElement == 'string') {
			addNewItem(item, secondElement, firstElement);	
		}
	});
}

function addNewItem(item,firstElement, secondElement) {
	let indexOfMathcedElement = item.indexOf(firstElement);

	if(indexOfMathcedElement !== -1) {

		if(typeof secondElement != 'number') {
			item.push(secondElement);	
		} else {
			item.splice(indexOfMathcedElement,1);
			let isNumbFind = false;
			item.forEach( (diffItem, i) => {
				if(typeof diffItem == 'number') {
					isNumbFind = true;
					item[i] =  gf256.add(diffItem, secondElement);
				}
			});
			
			if(!isNumbFind) {
				item.push(secondElement);
			}

			item.unshift(firstElement);
		}		
	}
}