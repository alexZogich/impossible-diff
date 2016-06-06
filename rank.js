module.exports = (matrix) => {
	transformFirstColumn(matrix);
};

const transformFirstColumn = (matrix) => {
	let firstElement = matrix[0][0];

	matrix[0].map( (item,i) => {
		if(typeof item == 'number') {

		}
	});

	console.log(matrix);
}