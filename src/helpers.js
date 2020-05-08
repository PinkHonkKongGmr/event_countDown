export const arrayCreator = function (len) {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i + 1);
	}
	return arr;
};

export const putToLocalStorage = function (key, val) {
	const obj = localStorage.getItem('eventsTest2') ? JSON.parse(localStorage.getItem('eventsTest2')) : {};
	obj[key] = val;
	localStorage.setItem('eventsTest2', JSON.stringify(obj));
};
