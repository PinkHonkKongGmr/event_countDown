export const arrayCreator = function (len) {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i + 1);
	}
	return arr;
};

export const putToLocalStorage = function (key, val) {
	const obj = localStorage.getItem('__events__') ? JSON.parse(localStorage.getItem('__events__')) : {};
	obj[key] = val;
	localStorage.setItem('__events__', JSON.stringify(obj));
};

export const deletFromLocalStorage = function (key) {
	const obj = localStorage.getItem('__events__') ? JSON.parse(localStorage.getItem('__events__')) : {};
	delete obj[key];
	localStorage.setItem('__events__', JSON.stringify(obj));
};
