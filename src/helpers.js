export const arrayCreator = function (len) {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i + 1);
	}
	return arr;
};
